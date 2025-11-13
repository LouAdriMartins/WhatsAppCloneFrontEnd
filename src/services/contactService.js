import ENVIRONMENT from "../config/environment.js"
import {
    HEADERS,
    CONTENT_TYPE_VALUES,
    HTTP_METHODS
} from "../constants/http.js"
import LOCALSTORAGE_KEYS from "../constants/localstorage.js"

/* ------------------------------------------------------
AUX — Obtiene token de localStorage
------------------------------------------------------ */
function getToken() {
    const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
    if (!token) {
        throw new Error("Falta token de autenticación")
    }
    return token
}

/* ------------------------------------------------------
HELPER — Realiza fetch con token
------------------------------------------------------ */
async function apiRequest(url, options = {}) {
    const token = getToken()

    const response = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            [HEADERS.AUTHORIZATION]: `Bearer ${token}`
        }
    })

    let json = {}
    try {
        json = await response.json()
    } catch (e) {
        console.error(`Error parseando JSON de ${url}`, e)
    }

    if (!response.ok) {
        throw new Error(json?.message || `Error en request: ${url}`)
    }

    return json?.data ?? json
}

/* ------------------------------------------------------
GET — Lista de contactos (con búsqueda opcional)
------------------------------------------------------ */
export async function getContacts(searchTerm = "") {
    const url = `${ENVIRONMENT.URL_API}/api/contacts?search=${encodeURIComponent(searchTerm)}`
    return await apiRequest(url, { method: HTTP_METHODS.GET })
}

/* ------------------------------------------------------
GET — Obtener contacto por ID
------------------------------------------------------ */
export async function getContactById(contact_id) {
    const url = `${ENVIRONMENT.URL_API}/api/contacts/contact/${contact_id}`
    return await apiRequest(url, { method: HTTP_METHODS.GET })
}

export async function getContactByUserId(contact_user_id) {
    const url = `${ENVIRONMENT.URL_API}/api/contacts/by-user/${contact_user_id}`
    return await apiRequest(url, { method: HTTP_METHODS.GET })
}

/* ------------------------------------------------------
POST — Crear contacto
------------------------------------------------------ */
export async function createContact(contactData) {
    const url = `${ENVIRONMENT.URL_API}/api/contacts`
    return await apiRequest(url, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify(contactData)
    })
}

/* ------------------------------------------------------
Alias útil: refrescar contactos (sin filtros)
------------------------------------------------------ */
export async function refreshContacts() {
    return await getContacts("")
}
