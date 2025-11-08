import React, { useContext } from "react"
import ContactItem from "../ContactItem/ContactItem"
import { HomeContactContext } from "../../Context/HomeContactContext"
import LoaderSpinner from "../LoaderSppiner/LoaderSpinner.jsx"
import "./ContactsList.css"

export default function ContactsList() {
    const {
        filteredContacts,
        isLoadingContacts,
        searchTerm,
    } = useContext(HomeContactContext)

    /* ------------------------------------------------------
        Loader
    ------------------------------------------------------ */
    if (isLoadingContacts) {
        return <LoaderSpinner />
    }

    /* ------------------------------------------------------
        Mensajes cuando NO hay resultados
    ------------------------------------------------------ */
    if (filteredContacts.length === 0) {
        return (
            <div className="no-chats-message">
                {searchTerm.trim() === ""
                    ? "Buscá un contacto para empezar una conversación"
                    : "No se encontraron contactos con ese nombre"}
            </div>
        )
    }

    /* ------------------------------------------------------
        Ordenar contactos por fecha
    ------------------------------------------------------ */
    const sortedContacts = [...filteredContacts]

    return (
        <div className="contacts-list">
            {sortedContacts.map((contact) => (
                <ContactItem
                    key={contact._id || contact.id}
                    id={contact._id || contact.id}
                    name={contact.name}
                    image_route={contact.profile_image_url}
                    last_message={null}     // aún no manejamos mensajes reales
                    hora={""}
                    unread_messages={0}
                    is_archived={contact.is_archived ?? false}
                />
            ))}
        </div>
    )
}
