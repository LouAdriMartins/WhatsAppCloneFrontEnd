import ENVIRONMENT from "../config/environment.js"
import {
    HEADERS,
    CONTENT_TYPE_VALUES,
    HTTP_METHODS
} from "../constants/http.js"
import LOCALSTORAGE_KEYS from "../constants/localstorage.js"

function getToken() {
    return localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
}

/* ============================================================
    Obtener todos los chats del usuario
============================================================ */
export async function getUserChats(userId) {
    const token = getToken()
    const res = await fetch(`${ENVIRONMENT.URL_API}/api/chats/user/${userId}`, {
        method: HTTP_METHODS.GET,
        headers: {
            [HEADERS.AUTHORIZATION]: `Bearer ${token}`,
        },
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error?.message || "Error obteniendo chats del usuario")
    }
    return res.json()
}


/* ============================================================
    Crear un chat 1:1 (con un contacto)
============================================================ */
export async function createChat({ contactId }) {
    const token = getToken()
    const res = await fetch(`${ENVIRONMENT.URL_API}/api/chats`, {
        method: HTTP_METHODS.POST,
        headers: {
            [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            [HEADERS.AUTHORIZATION]: `Bearer ${token}`,
        },
        body: JSON.stringify({ contactId }),
    })
    if (!res.ok) {
        const error = await res.json()
        throw new Error(error?.message || "Error creando chat")
    }
    return res.json()
}
