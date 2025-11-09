import { Link } from "react-router-dom"
import "./ContactItem.css"
import { IoCheckmarkDoneSharp } from "react-icons/io5"
import { BiArchiveIn } from "react-icons/bi"
import default_image from "../../../readme-images/default-image.png"

// Imagen por defecto
const DEFAULT_AVATAR = default_image

export default function ContactItem({
    id,
    name,
    image_route,
    last_message,
    hora,
    unread_messages,
    is_archived
}) {
    // Si no hay imagen, usar la default
    const avatar = image_route ?? DEFAULT_AVATAR

    return (
        <div
            className={`contact-item ${
                unread_messages > 0 ? "has-unread" : ""
            } ${is_archived ? "is-archived" : ""}`}
        >
            {is_archived ? (
                /* Item ARCHIVADOS */
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
                /* Contacto normal */
                <Link to={`/contact/${id}/messages`} className="contact-link">
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
                            {hora && <span className="contact-time">{hora}</span>}
                        </div>

                        <div className="contact-message">
                            <div className="message-content">
                                {last_message?.status && (
                                    <span className={`message-status ${last_message.status}`}>
                                        <IoCheckmarkDoneSharp className="check-icon" />
                                    </span>
                                )}

                                <p className="message-text">
                                    {last_message?.text || "Sin mensajes aún"}
                                </p>
                            </div>

                            {unread_messages > 0 && (
                                <span className="unread-badge">
                                    {unread_messages > 99 ? "99+" : unread_messages}
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
            )}
        </div>
    )
}
