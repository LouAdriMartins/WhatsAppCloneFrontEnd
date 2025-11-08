import React, { useContext } from "react";
import Message from "../Message/Message";
import { MessageContext } from "../../Context/MessageContext";
import "./Chat.css";

export default function Chat() {
    const { messages } = useContext(MessageContext)

    if (!messages || messages.length === 0) {
        return <div className="empty-chat">No hay mensajes en la bandeja de entrada!</div>
    }

    return (
        <div className='chat-container'>
            {messages.map((message) => (
                <Message
                    key={message.id}
                    id={message.id}
                    emisor={message.emisor}
                    hora={message.hora}
                    text={message.text}
                    status={message.status}
                />
            ))}
        </div>
    );
}