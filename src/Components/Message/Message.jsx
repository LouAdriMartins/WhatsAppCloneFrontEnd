import { useContext } from "react"
import { MessageContext } from "../../Context/MessageContext"
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from "react-icons/io5"
import { AiOutlineDelete } from "react-icons/ai"
import "./Message.css"

export default function Message({ emisor, hora, id, text, status }) {
    const { handleDeleteMessages } = useContext(MessageContext)

    const isMine = emisor === "YO"
    const messageClass = isMine ? "my-message" : "their-message"
    const tailClass = isMine ? "tail-right" : "tail-left"

    return (
        <div className={`chat-dialog chat-dialog--${messageClass}`}>
            <div className="message-content">
                <span className="message-text">
                    {text}
                    <span className="message-meta-inline">
                        <span className="hora">{hora}</span>
                        {isMine && (
                        <span className="status-icon">
                            {status ? (
                            <IoCheckmarkDoneOutline className="check-read" size={16} title="Visto" />
                            ) : (
                            <IoCheckmarkOutline className="check-sent" size={16} title="No visto" />
                            )}
                        </span>
                        )}
                        <button onClick={() => handleDeleteMessages(id)} className="delete-btn" aria-label="Eliminar mensaje">
                            <AiOutlineDelete size={16} />
                        </button>
                    </span>
                </span>
            </div>
            <div className={`message-tail ${tailClass}`}></div>
        </div>
    )
}