import { Link } from "react-router-dom"
import "./ContactItem.css"
import { IoCheckmarkDoneSharp } from "react-icons/io5"
import { BiArchiveIn } from "react-icons/bi"

export default function ContactItem({
    id,
    name,
    image_route,
    last_message,
    hora,
    unread_messages,
    is_archived
    }) {
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
                <Link to={`/contact/${id}/messages`} className="contact-link">
                    <div className="contact-avatar">
                        <img
                            src={image_route || "/placeholder.svg"}
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
