import React from "react"
import useFetch from "../../../Hooks/useFetch.js"
import useForm from "../../../Hooks/useForm.js"
import { recoverPassword } from "../../../services/authService.js"
//import "./RecoverPasswordForm.css"

const FORM_FIELDS = {
    EMAIL: "email",
}

const initial_form_state = {
    [FORM_FIELDS.EMAIL]: "",
}

export default function RecoverPasswordForm({ onSuccess }) {
    const { sendRequest, loading, response, error } = useFetch()

    const onRecoverPassword = (form_state) => {
        sendRequest(() => recoverPassword(form_state[FORM_FIELDS.EMAIL]))
    }

    const { form_state, handleSubmit, handleInputChange } = useForm({
        initial_form_state,
        onSubmit: onRecoverPassword,
    })

    if (response) onSuccess(response)

    return (
        <form className="recover-form" onSubmit={handleSubmit}>
            <label htmlFor={FORM_FIELDS.EMAIL}>Email:</label>
            <input
                name={FORM_FIELDS.EMAIL}
                id={FORM_FIELDS.EMAIL}
                type="email"
                onChange={handleInputChange}
                value={form_state[FORM_FIELDS.EMAIL]}
                required
            />

            {!response ? (
                <button type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar enlace de recuperación"}
                </button>
            ) : (
                <span className="success">
                {response.message || "Correo enviado con éxito"}
                </span>
            )}

            {error && <span className="error">{error.message}</span>}
        </form>
    )
}
