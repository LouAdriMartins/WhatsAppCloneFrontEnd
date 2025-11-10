import React, { useState } from "react"
import { resetPassword } from "../../../services/authService.js"
import useFetch from "../../../Hooks/useFetch.js"
import { FaLock, FaArrowRight } from "react-icons/fa"
import "./ResetPasswordForm.css"

export default function ResetPasswordForm({ token, onSuccess }) {
    const { sendRequest, loading, response, error } = useFetch()
    const [newPassword, setNewPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        sendRequest(() => resetPassword(token, newPassword))
    }

    if (response) {
        onSuccess(response)
    }

    return (
        <form className="my-reset-form" onSubmit={handleSubmit}>

            <h2 className="my-reset-form__title">Restablecer contraseña</h2>
            <p className="my-reset-form__subtitle">
                Ingresá tu nueva contraseña
            </p>

            <div className="my-reset-form__group">
                <FaLock className="my-reset-form__icon" />
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="my-reset-form__input"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>

            {!response ? (
                <button
                    type="submit"
                    disabled={loading}
                    className="my-reset-form__button"
                >
                    {loading ? "Guardando..." : <>Actualizar contraseña <FaArrowRight /></>}
                </button>
            ) : (
                <span className="my-reset-form__success">
                    {response.message || "Actualizada con éxito"}
                </span>
            )}

            {error && <span className="my-reset-form__error">{error.message}</span>}
        </form>
    )
}
