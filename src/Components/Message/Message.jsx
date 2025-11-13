import { useContext } from "react"
import { MessageContext } from "../../Context/MessageContext"
import { IoCheckmark, IoCheckmarkDone } from "react-icons/io5"
import { AiOutlineDelete } from "react-icons/ai"
import "./Message.css"

export default function Message({ emisor, hora, id, text, status }) {
    const { deleteMessage } = useContext(MessageContext)

    const isMine = emisor === "YO"
    const messageClass = isMine ? "my-message" : "their-message"
    const tailClass = isMine ? "tail-right" : "tail-left"

    // Formatear la hora local (sin segundos)
    let localHora = ""
    try {
        const fecha = new Date(hora)
        if (!isNaN(fecha.getTime())) {
            localHora = fecha.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
        } else {
            localHora = ""
        }
    } catch {
        localHora = ""
    }

    // Elegir ícono según estado del mensaje
    const getStatusIcon = () => {
        if (!isMine) return null
        switch (status) {
            case "read":
                return <IoCheckmarkDone className="check-read" size={16} title="Leído" />
            case "delivered":
                return <IoCheckmarkDone className="check-delivered" size={16} title="Entregado" />
            case "sent":
            default:
                return <IoCheckmark className="check-sent" size={16} title="Enviado" />
        }
    }

    return (
        <div className={`chat-dialog ${messageClass}`}>
            <div className="message-bubble">
                <span className="message-text">{text}</span>

                <div className="message-meta">
                    <span className="hora">{localHora}</span>

                    {getStatusIcon()}

                    {isMine && (
                        <button
                        onClick={() => deleteMessage(id)}
                        className="delete-btn"
                        aria-label="Eliminar mensaje"
                        >
                        <AiOutlineDelete size={16} />
                        </button>
                    )}
                </div>
            </div>

            <div className={`message-tail ${tailClass}`}></div>
        </div>
    )
}
