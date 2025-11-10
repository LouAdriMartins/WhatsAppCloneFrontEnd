import LOCALSTORAGE_KEYS from "../constants/localstorage.js"
import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http"
import ENVIRONMENT from "../config/environment.js"

// Obtener mi perfil
export async function getMyProfile() {
    const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
    const response = await fetch(`${ENVIRONMENT.URL_API}/api/users/me`, {
        headers: {
            [HEADERS.AUTHORIZATION]: `Bearer ${token}`
        }
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Error obteniendo perfil")
    }
    return data.data
}

// Actualizar campos del usuario
export async function updateMyProfile(changes) {
    const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
    const response = await fetch(`${ENVIRONMENT.URL_API}/api/users/me`, {
        method: HTTP_METHODS.PUT,
        headers: {
            [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            [HEADERS.AUTHORIZATION]: `Bearer ${token}`,
        },
        body: JSON.stringify(changes)
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message || "Error al actualizar perfil")
    }
    return data.data
}

// Actualizar solo nombre
export async function updateUserName(name) {
    return updateMyProfile({ name })
}

// Subir imagen de perfil
export async function uploadProfileImage(file) {
    const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
    const formData = new FormData()
    formData.append("profile_image", file)
    const response = await fetch(`${ENVIRONMENT.URL_API}/api/users/upload-photo`, {
        method: HTTP_METHODS.POST,
        headers: {
            [HEADERS.AUTHORIZATION]: `Bearer ${token}`,
        },
        body: formData
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message || "Error subiendo imagen")
    }
    return data.url
}

// Eliminar foto de perfil
export async function deleteProfileImage() {
    const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
    const response = await fetch(`${ENVIRONMENT.URL_API}/api/users/delete-photo`, {
        method: HTTP_METHODS.DELETE,
        headers: {
            [HEADERS.AUTHORIZATION]: `Bearer ${token}`
        }
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message || "Error eliminando foto")
    }
    return data.data
}
