import { useState, useContext } from "react"
import EmojiPicker from "emoji-picker-react"
import { MessageContext } from "../../Context/MessageContext"
import { IoSendSharp } from "react-icons/io5"
import "./NewMessageForm.css"

export default function NewMessageForm() {
  const { AddNewMessage } = useContext(MessageContext)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [message, setMessage] = useState("")

  // Función para enviar mensaje
  const enviarMensaje = () => {
    if (message.trim().length < 1) {
      alert("El mensaje debe tener al menos un caracter")
      return
    }
    AddNewMessage(message.trim())
    setMessage("")
    setShowEmojiPicker(false)
  }

  // Función para agregar emoji
  const agregarEmoji = (emojiData) => {
    setMessage(message + emojiData.emoji)
  }

  // Función para manejar teclas
  const manejarTecla = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      enviarMensaje()
    }
  }

  return (
    <div className="whatsapp-input-container">
      {showEmojiPicker && (
        <div className="emoji-picker-overlay">
          <EmojiPicker onEmojiClick={agregarEmoji} height={400} width="100%" />
        </div>
      )}
      <div className="whatsapp-input-bar">
        <div className="input-wrapper">
          <button 
            type="button" 
            className="emoji-button" 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😀
          </button>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={manejarTecla}
            placeholder="Escribe un mensaje"
            className="message-input"
            rows={1}
          />
          <button type="button" className="attach-button">
            📎
          </button>
        </div>
        <button 
          type="button" 
          onClick={enviarMensaje} 
          className="send-button"
        >
          <IoSendSharp />
        </button>
      </div>
    </div>
  )
}