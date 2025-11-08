//----------------------------------------CREACIÓN DE CONTEXTO-DETALLE DE CONTACTO----------------------------------------
/*
    Archivo: src/Context/ContactDetailContext.jsx

    Este archivo contiene el contexto encargado de gestionar el detalle de un contacto.
    Ahora utiliza la API real a través del servicio getContactById, con manejo de carga y errores.
*/
//------------------------------------------------------------------------------------------------------------------------------------

import React, { createContext, useState } from "react"
import { getContactById } from "../services/contactService.js"

const ContactDetailContext = createContext({
    contactDetail: null,
    loadContact: async () => {},
    isLoadingDetail: false,
    error: null
})

const ContactDetailContextProvider = ({ children }) => {
    const [contactDetail, setContactDetail] = useState(null)
    const [isLoadingDetail, setIsLoadingDetail] = useState(false)
    const [error, setError] = useState(null)

    const loadContact = async (contact_id) => {
        setIsLoadingDetail(true)
        setError(null)
        try {
            const contactSelected = await getContactById(contact_id)
            setContactDetail(contactSelected)
        } 
        catch (err) {
            console.error("Error al cargar el contacto:", err)
            setError(err.message || "No se pudo cargar el contacto")
            setContactDetail(null)
        } 
        finally {
            setIsLoadingDetail(false)
        }
    }

    return (
        <ContactDetailContext.Provider
            value={{
                loadContact,
                isLoadingDetail,
                contactDetail,
                error
            }}
        >
            {children}
        </ContactDetailContext.Provider>
    )
}

export { ContactDetailContext }
export default ContactDetailContextProvider