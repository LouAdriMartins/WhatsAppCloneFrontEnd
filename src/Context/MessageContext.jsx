import { createContext, useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { 
    getMessages, 
    sendMessage, 
    deleteMessageAPI,
    markDeliveredAPI,
    markReadAPI
} from "../services/messageService"
import { io } from "socket.io-client"
import { AuthContext } from "./AuthContext"
import { HomeContactContext } from "./HomeContactContext"
import ENVIRONMENT from "../config/environment"
import LOCALSTORAGE_KEYS from "../constants/localstorage"
import { getUserChats } from "../services/chatService"

export const MessageContext = createContext()
let socket = null

export function MessageProvider({ children }) {
    const { user } = useContext(AuthContext)
    const { reload } = useContext(HomeContactContext)
    const { contact_user_id } = useParams()

    const [messages, setMessages] = useState([])
    const [isLoadingMessages, setIsLoadingMessages] = useState(false)
    const [currentChatId, setCurrentChatId] = useState(null)

    /* ============================================================
        SOCKET — conexión estable con reconexión
    ============================================================ */
    useEffect(() => {
        if (!user) return
        socket = io(ENVIRONMENT.URL_API, {
            query: { userId: user._id },
            transports: ["websocket"],
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 500,
            timeout: 20000
        })
        socket.on("connect", () => console.log("Socket conectado:", socket.id))
        socket.on("connect_error", (err) => console.warn("Error socket:", err.message))
        return () => socket?.disconnect()
    }, [user])

    /* ============================================================
        Resolver chat real
    ============================================================ */
    useEffect(() => {
        async function resolveChat() {
            if (!user || !contact_user_id) return

            try {
                const allChats = await getUserChats(user._id)
                const existing = allChats.find(chat =>
                    chat.users.some(u => u._id.toString() === contact_user_id)
                )
                if (existing) setCurrentChatId(existing._id)
            } catch (e) {
                console.error("Error obteniendo chat:", e)
            }
        }
        resolveChat()
    }, [user, contact_user_id])

    /* ============================================================
        Unirse a la room
    ============================================================ */
    useEffect(() => {
        if (socket && currentChatId) {
            socket.emit("join-room", currentChatId)
        }
    }, [socket, currentChatId])

    /* ============================================================
        Cargar mensajes
    ============================================================ */
    useEffect(() => {
        if (currentChatId) loadMessages(currentChatId)
    }, [currentChatId])

    async function loadMessages(chatId) {
        try {
            setIsLoadingMessages(true)
            const backendMessages = await getMessages(chatId)

            const formatted = backendMessages.map(m => ({
                ...m,
                deleted: Boolean(m.deletedAt),
                content: m.deletedAt ? "Mensaje eliminado" : m.content,
                sender: m.sender._id === user._id ? "YO" : "ELLOS"
            }))

            setMessages(formatted)
        } catch (e) {
            console.error("Error cargando mensajes:", e)
            setMessages([])
        } finally {
            setIsLoadingMessages(false)
        }
    }

    /* ============================================================
        LISTENERS DEL SOCKET
    ============================================================ */
    useEffect(() => {
        if (!socket || !user) return

        // mensaje nuevo
        const onIncoming = async (msg) => {
            if (msg.sender.toString() !== user._id.toString()) {
                try { await markDeliveredAPI(msg._id) } catch {}
            }

            setMessages(prev => {
                if (prev.some(m => m._id === msg._id)) return prev
                return [...prev, {
                    ...msg,
                    deleted: false,
                    content: msg.content,
                    sender: msg.sender.toString() === user._id ? "YO" : "ELLOS"
                }]
            })
        }

        // borrado
        const onDeleted = (info) => {
            if (info.softDeleted) {
                // SOFT DELETE -> lo marcamos eliminado
                setMessages(prev =>
                    prev.map(m =>
                        m._id === info.messageId
                            ? { ...m, deleted: true, content: "Mensaje eliminado" }
                            : m
                    )
                )
            } else if (info.hardDeleted) {
                // HARD DELETE -> lo eliminamos del array
                setMessages(prev => prev.filter(m => m._id !== info.messageId))
            }
        }

        // cambio de estado
        const onStatus = (msg) => {
            setMessages(prev =>
                prev.map(m => m._id === msg._id ? { ...m, status: msg.status } : m)
            )
        }

        socket.on("message:new", onIncoming)
        socket.on("message:deleted", onDeleted)
        socket.on("message:status", onStatus)

        return () => {
            socket.off("message:new", onIncoming)
            socket.off("message:deleted", onDeleted)
            socket.off("message:status", onStatus)
        }
    }, [socket, user])

    /* ============================================================
        Marcar como READ cuando están visibles
    ============================================================ */
    useEffect(() => {
        async function markAll() {
            if (!currentChatId || !messages.length || !user) return

            const toMark = messages.filter(m => m.sender !== "YO" && m.status !== "read")

            for (const m of toMark) {
                try {
                    await markReadAPI(m._id)
                } catch {}
            }
        }

        markAll()
    }, [messages, currentChatId, user])

    /* ============================================================
        Enviar mensaje
    ============================================================ */
    async function AddNewMessage(content) {
        try {
            await sendMessage({
                peerUserId: contact_user_id,
                content
            })
        } catch (e) {
            console.error("Error enviando mensaje:", e)
        }
    }

    /* ============================================================
        Eliminar mensaje (soft → hard)
    ============================================================ */
    async function deleteMessage(messageId, mode) {
        try {
            const msg = messages.find(m => m._id === messageId)
            // === SOFT DELETE ===
            if (mode === "soft" && msg && !msg.deleted) {
                await deleteMessageAPI(messageId)
                // Actualizar mensaje en pantalla → aparece "Mensaje eliminado"
                setMessages(prev =>
                    prev.map(m =>
                        m._id === messageId
                            ? { ...m, deleted: true, content: "Mensaje eliminado" }
                            : m
                    )
                )
                reload()
                return
            }
            // === HARD DELETE ===
            if (mode === "hard") {
                await deleteMessageAPI(messageId)
                setMessages(prev =>
                    prev.filter(m => m._id !== messageId)
                )
                reload()
                return
            }
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
