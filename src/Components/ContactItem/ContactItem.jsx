import { Link } from "react-router-dom"
import "./ContactItem.css"
import { IoCheckmark, IoCheckmarkDoneSharp } from "react-icons/io5"
import { BiArchiveIn } from "react-icons/bi"
import default_image from "../../../readme-images/default-image.png"

// Imagen por defecto
const DEFAULT_AVATAR = default_image

function formatHour(dateString) {
    if (!dateString) return ""
    const d = new Date(dateString)
    return d.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit"
    })
}

// ==============================
// Renderiza estado del mensaje
// ==============================
function renderStatus(status) {
    if (!status) return null
    switch (status) {
        case "sent":
            return (
                <span className="message-status">
                    <IoCheckmark className="check-icon sent" />
                </span>
            )
        case "delivered":
            return (
                <span className="message-status">
                    <IoCheckmarkDoneSharp className="check-icon delivered first" />
                    <IoCheckmarkDoneSharp className="check-icon delivered second" />
                </span>
            )
        case "read":
            return (
                <span className="message-status">
                    <IoCheckmarkDoneSharp className="check-icon read first" />
                    <IoCheckmarkDoneSharp className="check-icon read second" />
                </span>
            )
        default:
            return null
    }
}

export default function ContactItem({
    id,
    name,
    image_route,
    last_message,
    unread_messages,
    is_archived,
    contact_user_id
}) {
    const avatar = image_route ?? DEFAULT_AVATAR
    
    let lastText = "Sin mensajes aún"
    let lastTime = ""
    let lastStatus = null

    if (last_message) {
        if (last_message?.deletedAt) {
            lastText = "Mensaje eliminado"
        } else {
            lastText = last_message.text
            lastTime = formatHour(last_message.createdAt)
            lastStatus = last_message.status
        }
    }

    return (
        <div
            className={`contact-item ${
                unread_messages > 0 ? "has-unread" : ""
            } ${is_archived ? "is-archived" : ""}`}
        >
            {is_archived ? (
                <div className="contact-link no-link" aria-disabled="true">
                    <div className="contact-avatar">
                        <BiArchiveIn className="archived-icon" />
                    </div>

                    <div className="contact-info">
                        <div className="contact-header">
                            <h3 className="contact-name">{name}</h3>
                        </div>
                    </div>
                </div>
            ) : (
                /* CONTACTO NORMAL */
                <Link
                    to={`/contact/${contact_user_id}/messages`}
                    className="contact-link"
                >
                    <div className="contact-avatar">
                        <img
                            src={avatar}
                            alt={`Imagen de contacto ${name}`}
                            className="avatar-image"
                        />
                    </div>

                    <div className="contact-info">
                        <div className="contact-header">
                            <h3 className="contact-name">{name}</h3>

                            {lastTime && (
                                <span className="contact-time">{lastTime}</span>
                            )}
                        </div>

                        <div className="contact-message">
                            <div className="message-content">

                                {/* Estado del mensaje (sent / delivered / read) */}
                                {renderStatus(lastStatus)}

                                {/* Texto del último mensaje */}
                                <p
                                    className={`message-text ${
                                        last_message?.deleted ? "deleted-preview" : ""
                                    }`}
                                >
                                    {lastText.length > 40
                                        ? lastText.slice(0, 40) + "…"
                                        : lastText}
                                </p>
                            </div>

                            {unread_messages > 0 && (
                                <span className="unread-badge">
                                    {unread_messages > 99
                                        ? "99+"
                                        : unread_messages}
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
            )}
        </div>
    )
}
