import React, { useContext } from "react"
import ContactItem from "../ContactItem/ContactItem"
import { HomeContactContext } from "../../Context/HomeContactContext"
import LoaderSpinner from "../LoaderSppiner/LoaderSpinner.jsx"
import "./ContactsList.css"

export default function ContactsList() {
    const { 
        filteredContacts, 
        contacts, 
        isLoadingContacts, 
        searchTerm 
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
    const showList =
        searchTerm.trim() === "" ? contacts : filteredContacts

    if (showList.length === 0) {
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
    const sortedContacts = [...showList]

    return (
        <div className="contacts-list">
            {sortedContacts.map((contact) => (
                <ContactItem
                    key={contact._id}
                    id={contact._id}
                    contact_user_id={contact.contact_user_id}
                    name={contact.name}
                    image_route={contact.profile_image_url}
                    last_message={contact.lastMessage}
                    hora={contact.lastMessage?.createdAt}
                    unread_messages={contact.unread_messages}
                    is_archived={contact.is_archived ?? false}
                    chatId={contact.chatId}
                />
            ))}
        </div>
    )
}
