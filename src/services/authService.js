import { CONTENT_TYPE_VALUES, HEADERS, HTTP_METHODS } from "../constants/http"
import LOCALSTORAGE_KEYS from "../constants/localstorage.js"
import ENVIRONMENT from "../config/environment.js"


export async function register(name, email, password) {
    const usuario = {
        name,
        email,
        password
    }
    const response_http = await fetch(
        `${ENVIRONMENT.URL_API}/api/auth/register`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                //Como vamos a enviar JSON, configuro que mi consulta envia contenido tipo JSON
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON
            },
            body: JSON.stringify({...usuario})
        }
    )
    //Transformamos a objeto de JS el body de la respuesta
    const response_data = await response_http.json()
    if (!response_http.ok) {
        throw new Error(response_data.message)
    }
    return response_data
}

export async function login(email, password) {
    const response = await fetch(
        `${ENVIRONMENT.URL_API}/api/auth/login`,
        {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            },
            body: JSON.stringify({ email, password })
        }
    )
    const response_data = await response.json()
    if (!response.ok) {
        throw new Error(response_data.message || "Error al iniciar sesión")
    }
    const token = response_data?.data?.token
    if (!token) {
        throw new Error("Token ausente en la respuesta del servidor")
    }
    localStorage.setItem(LOCALSTORAGE_KEYS.AUTH_TOKEN, token)
    return response_data
}

export async function recoverPassword(email) {
    const response = await fetch(
            `${ENVIRONMENT.URL_API}/api/auth/recover-password`,
            {
            method: HTTP_METHODS.POST,
            headers: {
                [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
            },
            body: JSON.stringify({ email }),
        })
    const response_data = await response.json()
    if (!response.ok) {
        throw new Error(response_data.message)
    }
    return response_data
}

export async function resetPassword(token, new_password) {
    const response = await fetch(
        `${ENVIRONMENT.URL_API}/api/auth/reset-password/${token}`,
        {
        method: "POST",
        headers: {
            [HEADERS.CONTENT_TYPE]: CONTENT_TYPE_VALUES.JSON,
        },
        body: JSON.stringify({ new_password }),
        }
    )
    const response_data = await response.json()
    if (!response.ok) {
        throw new Error(response_data.message)
    }
    return response_data
}
