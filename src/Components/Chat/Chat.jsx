import React, { useContext, useEffect, useRef, useState } from "react"
import Message from "../Message/Message"
import { MessageContext } from "../../Context/MessageContext"
import "./Chat.css"

export default function Chat() {
    const { messages } = useContext(MessageContext)
    const scrollRef = useRef(null)
    const [isNearBottom, setIsNearBottom] = useState(true)

    const handleScroll = () => {
        if (!scrollRef.current) return
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
        const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)
        setIsNearBottom(distanceFromBottom < 100)
    }

    // Auto-scroll
    useEffect(() => {
        if (isNearBottom && scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
            })
        }
    }, [messages])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [])

    if (!messages || messages.length === 0) {
        return <div className="empty-chat">No hay mensajes en la bandeja de entrada!</div>
    }

    return (
        <div
            className="chat-container"
            ref={scrollRef}
            onScroll={handleScroll}
        >
            <div className="messages-wrapper">
                {messages.map((message, index) => {
                    const currentDate = new Date(message.createdAt).toLocaleDateString()
                    const prevDate =
                        index > 0
                            ? new Date(messages[index - 1].createdAt).toLocaleDateString()
                            : null

                    const showDate = currentDate !== prevDate

                    return (
                        <React.Fragment key={message._id}>
                            {showDate && (
                                <div className="date-badge">{currentDate}</div>
                            )}

                            <Message
                                id={message._id}
                                emisor={message.sender}
                                hora={message.createdAt}
                                text={message.content}
                                status={message.status}
                                deleted={message.deleted}
                            />
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}
