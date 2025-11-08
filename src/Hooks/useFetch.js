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
            if (res instanceof Response) {
                data = await res.json()
            } else {
                data = res
            }
            if (!data) {
                throw new Error("El servidor no devolvió datos.")
            }
            if (!res.ok && data.message) {
                throw new Error(data.message)
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
