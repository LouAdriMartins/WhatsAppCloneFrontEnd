import ENVIRONMENT from "../config/environment.js"
import {
    HEADERS,
    CONTENT_TYPE_VALUES,
    HTTP_METHODS
} from "../constants/http.js"
import LOCALSTORAGE_KEYS from "../constants/localstorage.js"

// === aux: token desde localStorage ===
function getToken() {
    const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
    if (!token) {
        throw new Error("Falta token de autenticación")
    }
    return token
}

// === GET mensajes de un chat ===
export async function getMessages(chatId) {
    const token = getToken()
    const res = await fetch(`${ENVIRONMENT.URL_API}/api/messages/${chatId}`, {
        method: HTTP_METHODS.GET,
        headers: {
            [HEADERS.AUTHORIZATION]: `Bearer ${token}`,
        },
    })
    if (!res.ok) {
        throw new Error("Error obteniendo mensajes")
    }
    return res.json()
}

// === POST enviar mensaje ===
export async function sendMessage({ contactId, peerUserId, content }) {
    const token = getToken()
    const body = {}
    if (peerUserId) body.peerUserId = peerUserId
    if (contactId) body.contactId = contactId
    body.content = content
    const res = await fetch(`${ENVIRONMENT.URL_API}/api/messages`, {
        method: HTTP_METHODS.POST,
        headers: {
            [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            [HEADERS.AUTHORIZATION]: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    })
    if (!res.ok) {
        const errorText = await res.text()
        console.log("Respuesta con error del backend:", errorText)
        throw new Error("Error enviando mensaje")
    }
    return res.json()
}


// === DELETE mensaje ===
export async function deleteMessageAPI(id) {
    const token = getToken()
    const res = await fetch(`${ENVIRONMENT.URL_API}/api/messages/${id}`, {
        method: HTTP_METHODS.DELETE,
        headers: {
            [HEADERS.AUTHORIZATION]: `Bearer ${token}`,
        },
    })
    if (!res.ok) {
        const data = await res.json()
        throw new Error(data?.message || "Error borrando mensaje")
    }
    return res.json()
}
