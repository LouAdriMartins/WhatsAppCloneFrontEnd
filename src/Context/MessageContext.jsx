import { createContext, useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { getMessages, sendMessage, deleteMessageAPI } from "../services/messageService"
import { io } from "socket.io-client"
import { AuthContext } from "./AuthContext"
import ENVIRONMENT from "../config/environment"
import LOCALSTORAGE_KEYS from "../constants/localstorage"
import { getUserChats } from "../services/chatService"

export const MessageContext = createContext()
let socket = null

export function MessageProvider({ children }) {

    const { user } = useContext(AuthContext)
    const { contact_user_id } = useParams()

    const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)

    const [messages, setMessages] = useState([])
    const [isLoadingMessages, setIsLoadingMessages] = useState(false)
    const [currentChatId, setCurrentChatId] = useState(null)

    /* ============================================================
        Inicializar socket
    ============================================================ */
    useEffect(() => {
        if (!user) return

        socket = io(ENVIRONMENT.URL_API, {
            query: { userId: user._id },
            transports: ["websocket"]
        })

        return () => socket?.disconnect()
    }, [user])

    /* ============================================================
        Obtener o crear el chat REAL
    ============================================================ */
    useEffect(() => {
        async function resolveChat() {
            if (!user || !contact_user_id) return

            try {
                const allChats = await getUserChats(user._id)

                // FIX: en backend es "users", no "members"
                let existingChat = allChats.find(chat =>
                    chat.users.some(u => u._id.toString() === contact_user_id.toString())
                )

                if (!existingChat) return // previene errores

                setCurrentChatId(existingChat._id)

            } catch (error) {
                console.error("Error obteniendo chat:", error)
            }
        }

        resolveChat()
    }, [contact_user_id, user])


    /* ============================================================
        Unirse a la room del chat (WS estilo WhatsApp)
    ============================================================ */
    useEffect(() => {
        if (!socket || !currentChatId) return
        socket.emit("join-room", currentChatId)
    }, [socket, currentChatId])

    /* ============================================================
        Cargar mensajes cuando cambia el chat real
    ============================================================ */
    useEffect(() => {
        if (currentChatId) loadMessages(currentChatId)
    }, [currentChatId])

    /* ============================================================
        Cargar mensajes del backend
    ============================================================ */
    async function loadMessages(chatId) {
        if (!chatId) return

        try {
            setIsLoadingMessages(true)

            const backendMessages = await getMessages(chatId)

            const formatted = backendMessages.map(msg => ({
                ...msg,
                sender: msg.sender._id === user._id ? "YO" : "ELLOS"
            }))

            setMessages(formatted)

        } catch (error) {
            console.error("Error cargando mensajes:", error)
            setMessages([])
        } finally {
            setIsLoadingMessages(false)
        }
    }


    /* ============================================================
        Socket listeners
    ============================================================ */
    useEffect(() => {
        if (!socket) return

        const onIncomingMessage = (msg) => {
            setMessages(prev => {

                const exists = prev.some(m => m._id === msg._id)
                if (exists) return prev

                return [
                    ...prev,
                    {
                        ...msg,
                        sender: msg.sender.toString() === user._id ? "YO" : "ELLOS"
                    }
                ]
            })
        }

        const onDeletedMessage = (deletedId) => {
            setMessages(prev =>
                prev.filter(m => m._id !== deletedId)
            )
        }

        socket.on("message:new", onIncomingMessage)
        socket.on("message:deleted", onDeletedMessage)

        return () => {
            socket.off("message:new", onIncomingMessage)
            socket.off("message:deleted", onDeletedMessage)
        }
    }, [socket, user])


    /* ============================================================
        Enviar mensaje
    ============================================================ */
    async function AddNewMessage(content) {
        try {
            await sendMessage({
                peerUserId: contact_user_id,
                content
            })
        } catch (error) {
            console.error("Error enviando mensaje:", error)
        }
    }

    /* ============================================================
        Eliminar mensaje
    ============================================================ */
    async function deleteMessage(messageId) {
        try {
            await deleteMessageAPI(messageId)

            setMessages(prev =>
                prev.filter(m => m._id !== messageId)
            )

        } catch (error) {
            console.error("Error eliminando mensaje:", error)
        }
    }


    return (
        <MessageContext.Provider
            value={{
                messages,
                isLoadingMessages,
                AddNewMessage,
                deleteMessage,
            }}
        >
            {children}
        </MessageContext.Provider>
    )
}

export default MessageProvider
