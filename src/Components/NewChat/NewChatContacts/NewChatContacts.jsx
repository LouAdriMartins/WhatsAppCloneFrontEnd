import React, { useContext } from "react"
import ContactItem from "../../ContactItem/ContactItem"
import { HomeContactContext } from "../../../Context/HomeContactContext"
import "./NewChatContacts.css"

export default function NewChatContacts() {
    const {
        filteredContacts,
        contacts,
        searchTerm
    } = useContext(HomeContactContext)

    // Si no hay texto → mostrar todos los contactos
    // Si hay texto → mostrar los filtrados
    const listToShow =
        searchTerm.trim() === "" ? contacts : filteredContacts

    // Ordenar alfabéticamente la lista final
    const sorted = [...listToShow].sort((a, b) =>
        (a.name ?? "").localeCompare(b.name ?? "")
    )

    return (
        <div className="newchat-contacts">
            <span className="newchat-contacts_span">
                Contactos en WhatsApp Clone
            </span>

            {sorted.length === 0 ? (
                <p className="no-results-contacts">No se encontraron contactos</p>
            ) : (
                sorted.map(contact => (
                    <ContactItem
                        key={contact.contact_user_id}
                        contact_user_id={contact.contact_user_id}
                        name={contact.name}
                        image_route={contact.profile_image_url}
                        last_message={null}
                        hora={""}
                        unread_messages={0}
                        is_archived={false}
                    />
                ))
            )}
        </div>
    )
}
