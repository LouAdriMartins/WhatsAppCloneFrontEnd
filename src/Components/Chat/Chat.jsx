import React, { useContext, useEffect, useRef, useState } from "react"
import Message from "../Message/Message"
import { MessageContext } from "../../Context/MessageContext"
import "./Chat.css"

export default function Chat() {
    const { messages } = useContext(MessageContext)
    const scrollRef = useRef(null)
    const [isNearBottom, setIsNearBottom] = useState(true)

    // Detecta si el usuario está scrolleando
    const handleScroll = () => {
        if (!scrollRef.current) return
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
        const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)
        setIsNearBottom(distanceFromBottom < 100) // si está a menos de 100px del fondo
    }

    // Auto-scroll solo si estás al fondo
    useEffect(() => {
        if (isNearBottom && scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            })
        }
    }, [messages])

    // Carga inicial: bajar al fondo
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [])

    if (!messages || messages.length === 0) {
        return (
            <div className="empty-chat">
                No hay mensajes en la bandeja de entrada!
            </div>
        )
    }

    return (
        <div
            className="chat-container"
            ref={scrollRef}
            onScroll={handleScroll}
        >
            {messages.map((message) => (
                <Message
                    key={message._id}
                    id={message._id}
                    emisor={message.sender}
                    hora={message.createdAt}
                    text={message.content}
                    status={message.status}
                />
            ))}
        </div>
    )
}
