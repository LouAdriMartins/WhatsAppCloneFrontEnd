import React, { createContext, useState, useEffect, useCallback } from "react"
import { getContacts } from "../services/contactService"

export const HomeContactContext = createContext({
    contacts: [],
    filteredContacts: [],
    isLoadingContacts: true,
    searchContacts: () => {},
    clearSearch: () => {},
    filter: "todos",
    setFilter: () => {},
    searchTerm: "",
    reload: () => {}
})

const HomeContactContextProvider = ({ children }) => {
    const [contacts, setContacts] = useState([])
    const [filteredContacts, setFilteredContacts] = useState([])
    const [isLoadingContacts, setIsLoadingContacts] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState("todos")

    // Cargar contactos desde backend
    const loadContacts = useCallback(async () => {
        setIsLoadingContacts(true)
        try {
            const data = await getContacts()
            if (!Array.isArray(data)) {
                console.warn("Backend no devolvió una lista válida:", data)
                setContacts([])
                setFilteredContacts([])
                return
            }
            setContacts(data)
            setFilteredContacts([]) 
        } catch (err) {
            console.error("Error al cargar contactos:", err)
            setContacts([])
            setFilteredContacts([])
        } finally {
            setIsLoadingContacts(false)
        }
    }, [])

    useEffect(() => {
        loadContacts()
    }, [loadContacts])

    // Filtrar localmente SOLO cuando hay texto en la barra
    useEffect(() => {
        const term = searchTerm.trim().toLowerCase()
        if (term === "") {
            setFilteredContacts([])
            return
        }
        let filtered = contacts.filter((c) => {
        const name = (c.name ?? "").toLowerCase()
        const phone = (c.phone_number ?? "")
        return name.includes(term) || phone.includes(term.replace(/\s+/g, ""))
        })

        // Aplicando "filter"
        if (filter === "favoritos") {
            filtered = filtered.filter((c) => c.is_favorite)
        } else if (filter === "grupos") {
            filtered = filtered.filter((c) => c.is_group)
        }

        setFilteredContacts(filtered)
    }, [contacts, searchTerm, filter])

    // API pública del contexto
    const searchContacts = (term) => setSearchTerm(term)
    const clearSearch = () => setSearchTerm("")
    const reload = async () => { await loadContacts() }

    return (
        <HomeContactContext.Provider
            value={{
                contacts,
                filteredContacts,
                isLoadingContacts,
                searchContacts,
                clearSearch,
                filter,
                setFilter,
                searchTerm,
                reload
            }}
            >
            {children}
        </HomeContactContext.Provider>
    )
}

export default HomeContactContextProvider
