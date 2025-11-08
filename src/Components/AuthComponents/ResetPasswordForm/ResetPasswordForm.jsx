import React, { useState } from "react"
import { resetPassword } from "../../../services/authService.js"
import useFetch from "../../../Hooks/useFetch.js"
//import "./ResetPasswordForm.css"

export default function ResetPasswordForm({ token, onSuccess }) {
    const { sendRequest, loading, response, error } = useFetch()
    const [newPassword, setNewPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        sendRequest(() => resetPassword(token, newPassword))
    }
    // Si ya se recibió la respuesta, llamamos al callback onSuccess
    if (response) {
        onSuccess(response)
    }
    return (
        <form className="reset-password-form" onSubmit={handleSubmit}>
            <label htmlFor="newPassword">Nueva Contraseña:</label>
            <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />

            <button type="submit" disabled={loading}>
                {loading ? "Guardando..." : "Actualizar contraseña"}
            </button>

            {error && <p className="error">{error.message}</p>}
        </form>
    )
}
