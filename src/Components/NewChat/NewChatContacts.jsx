import React from "react"
import ContactItem from "../ContactItem/ContactItem"

export default function NewChatContacts({ contacts }) {
  // Contactos en orden alfabético
    const sorted = [...contacts].sort((a, b) =>
        (a.name ?? "").localeCompare(b.name ?? "")
    )

    return (
        <div className="newchat-contacts">
            {sorted.map(contact => (
                <ContactItem
                    key={contact._id || contact.id}
                    id={contact._id || contact.id}
                    name={contact.name}
                    image_route={contact.profile_image_url}
                    last_message={null}
                    hora={""}
                    unread_messages={0}
                    is_archived={false}
                />
            ))}
        </div>
    )
}
