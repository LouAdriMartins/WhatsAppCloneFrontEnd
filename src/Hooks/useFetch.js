import { useState } from "react"

const useFetch = () => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    async function sendRequest(requestCallback) {
        try {
            setLoading(true)
            setError(null)
            setResponse(null)

            const res = await requestCallback()
            let data

            // Si el servicio devolvió un Response real
            if (res instanceof Response) {
                data = await res.json()

                // validar errores solo si ES fetch nativo
                if (!res.ok) {
                    throw new Error(data?.message || "Error en la solicitud")
                    return null
                }
            } 
            // Si devolvió un JSON directo (como apiRequest)
            else {
                data = res
            }

            if (!data) {
                throw new Error("El servidor no devolvió datos.")
            }

            setResponse(data)

        } catch (err) {
            console.error("Error en fetch:", err)
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return { loading, response, error, sendRequest }
}

export default useFetch
