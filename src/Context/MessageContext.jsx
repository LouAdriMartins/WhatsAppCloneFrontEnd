//--------------------------------------------CREACIÓN DE CONTEXTO-MENSAJES----------------------------------------------------------
/* Archivo: src/Context/MessageContext.jsx
    Este archivo contiene la función de estado que renderiza los mensajes en la pantalla de chat. En este caso, se simula una llamada a un servicio getMessagesByContactId que retorna una lista de mensajes para un contacto específico. Además, se usa la función setTimeout para simular un retraso en la carga de los mensajes, para lo cual se creo un spinner de carga de WhatsApp.
*/
//------------------------------------------------------------------------------------------------------------------------------------
import React, { createContext } from "react"
import { useState } from "react"
import { getMessagesByContactId } from "../services/messageService"

export const MessageContext = createContext(
    {
        messages: [],
        handleDeleteMessages: (id_message) => {},
        AddNewMessage: (text) => {},
        loadMessages: (contact_id) => {},
        isLoadingMessages: true
    }
);

const MessageContextProvider = ({ children }) => {
    const [messages, setMessages] = useState([])
    const [idCounter, setIdCounter] = useState(1);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true)

    const loadMessages = (contact_id) => {
        setIsLoadingMessages(true)
        setTimeout(
            () => {
                const messagesList = getMessagesByContactId(contact_id)
                setMessages(messagesList)
                setIsLoadingMessages(false)
            },
            1000
        )
    }

    const handleDeleteMessages = (id_message) => {
        const NewMessageList = [];
        for (const message of messages) {
        if (message.id !== id_message) {
            NewMessageList.push(message)
        }
        }
        setMessages(NewMessageList);
    };

    const AddNewMessage = (text) => {
        const newMessage = {
        emisor: "YO",
        hora: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }),
        id: idCounter,
        text: text,
        }
        const cloneMessages = [...messages]
        cloneMessages.push(newMessage)
        setMessages(cloneMessages)
        setIdCounter(idCounter + 1)
    };
    return (
        <MessageContext.Provider
            value={{
                messages: messages,
                handleDeleteMessages: handleDeleteMessages,
                AddNewMessage: AddNewMessage,
                loadMessages: loadMessages,
                isLoadingMessages: isLoadingMessages
            }}
        >
            {children}
        </MessageContext.Provider>
    )
}

export default MessageContextProvider
