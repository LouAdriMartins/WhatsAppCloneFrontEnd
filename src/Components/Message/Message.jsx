import { useContext } from "react"
import { MessageContext } from "../../Context/MessageContext"
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5"
import { AiOutlineDelete } from "react-icons/ai"
import "./Message.css"

export default function Message({ emisor, hora, id, text, status, deleted }) {
    const { deleteMessage } = useContext(MessageContext)

    const isMine = emisor === "YO"
    const messageClass = isMine ? "my-message" : "their-message"
    const tailClass = isMine ? "tail-right" : "tail-left"

    let localHora = ""
    try {
        const fecha = new Date(hora)
        if (!isNaN(fecha.getTime())) {
            localHora = fecha.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
        }
    } catch { localHora = "" }

    function renderStatusIcon() {
        if (!isMine || deleted) return null
        switch (status) {
            case "read":
                return <IoCheckmarkDone className="check-read" size={16} />
            case "delivered":
                return <IoCheckmarkDone className="check-delivered" size={16} />
            case "sent":
            default:
                return <IoCheckmark className="check-sent" size={16} />
        }
    }

    const handleDeleteClick = () => {
        if (!deleted) {
            deleteMessage(id, "soft")
        } else {
            deleteMessage(id, "hard")
        }
    }

    return (
        <div className={`chat-dialog chat-dialog--${messageClass}`}>
            <div className="message-content">
                <span className="message-text">
                    
                    {deleted ? (
                        <i className="deleted-text">Mensaje eliminado</i>
                    ) : (
                        text
                    )}

                    <span className="message-meta-inline">
                        <span className="hora">{localHora}</span>
                        <span className="status-icon">{renderStatusIcon()}</span>

                        <button
                            onClick={handleDeleteClick}
                            className="delete-btn"
                        >
                            <AiOutlineDelete size={16} />
                        </button>
                    </span>
                </span>
            </div>

            <div className={`message-tail ${tailClass}`} />
        </div>
    )
}
