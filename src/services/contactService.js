import ENVIRONMENT from "../config/environment.js"
import {
    HEADERS,
    CONTENT_TYPE_VALUES,
    HTTP_METHODS
} from "../constants/http.js"
import LOCALSTORAGE_KEYS from "../constants/localstorage.js"

/* ------------------------------------------------------
AUX — Obtiene token
------------------------------------------------------ */
function getToken() {
    const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
    if (!token) {
        throw new Error("Falta token de autenticación")
    }
    return token
}

/* ------------------------------------------------------
GET — Lista de contactos (con búsqueda opcional)
------------------------------------------------------ */
export async function getContacts(searchTerm = "") {
    const token = getToken()
    const url = `${ENVIRONMENT.URL_API}/api/contacts?search=${encodeURIComponent(searchTerm)}`
    console.log("Fetching contacts from:", url)
    const response = await fetch(url, {
        method: HTTP_METHODS.GET,
        headers: {
            [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            [HEADERS.AUTHORIZATION]: `Bearer ${token}`
        }
    })
    const response_data = await response.json()
    if (!response.ok) {
        throw new Error(response_data.message || "Error al obtener contactos")
    }
    return response_data.data
}

/* ------------------------------------------------------
GET — Obtener contacto por ID
------------------------------------------------------ */
export async function getContactById(contact_id) {
    const token = getToken()
    const url = `${ENVIRONMENT.URL_API}/api/contacts/contact/${contact_id}`
    const response = await fetch(url, {
        method: HTTP_METHODS.GET,
        headers: {
            [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            [HEADERS.AUTHORIZATION]: `Bearer ${token}`
        }
    })
    const response_data = await response.json()
    if (!response.ok) {
        throw new Error(response_data.message || "Error al obtener contacto")
    }
    return response_data.data
}

/* ------------------------------------------------------
POST — Crear contacto
------------------------------------------------------ */
export async function createContact(contactData) {
    const token = getToken()
    if (!token) {
        throw new Error("Falta el token")
    }
    const url = `${ENVIRONMENT.URL_API}/api/contacts`
    const response = await fetch(url, {
        method: HTTP_METHODS.POST,
        headers: {
            [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            [HEADERS.AUTHORIZATION]: `Bearer ${token}`
        },
        body: JSON.stringify(contactData)
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.message)
    return data.data
}

/* ------------------------------------------------------
Alias útil: refrescar contactos (sin filtros)
------------------------------------------------------ */
export async function refreshContacts() {
    return await getContacts("")
}