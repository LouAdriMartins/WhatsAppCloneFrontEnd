import React from "react"
import useFetch from "../../../Hooks/useFetch.js"
import useForm from "../../../Hooks/useForm.js"
import { recoverPassword } from "../../../services/authService.js"
import { FaEnvelope, FaArrowRight } from "react-icons/fa"
import "./RecoverPasswordForm.css"

const FORM_FIELDS = {
    EMAIL: "email",
}

const initial_form_state = {
    [FORM_FIELDS.EMAIL]: "",
}

export default function RecoverPasswordForm({ onSuccess }) {
    const { sendRequest, loading, response, error } = useFetch()

    const onRecoverPassword = (form_state) => {
        sendRequest(() => 
            recoverPassword(form_state[FORM_FIELDS.EMAIL])
        )
    }

    const { form_state, handleSubmit, handleInputChange } = useForm({
        initial_form_state,
        onSubmit: onRecoverPassword,
    })

    if (response) onSuccess(response)

    return (
        <form className="my-recover-form" onSubmit={handleSubmit}>
            
            <h2 className="my-recover-form__title">Recuperar contraseña</h2>
            <p className="my-recover-form__subtitle">
                Ingresa tu correo para enviarte un enlace de recuperación.
            </p>

            <div className="my-recover-form__group">
                <FaEnvelope className="my-recover-form__icon" />
                <input
                    name={FORM_FIELDS.EMAIL}
                    id={FORM_FIELDS.EMAIL}
                    type="email"
                    placeholder="Correo electrónico"
                    onChange={handleInputChange}
                    value={form_state[FORM_FIELDS.EMAIL]}
                    className="my-recover-form__input"
                    required
                />
            </div>

            {!response ? (
                <button
                    type="submit"
                    disabled={loading}
                    className="my-recover-form__button"
                >
                    {loading ? "Enviando..." : <>Enviar enlace <FaArrowRight/></>}
                </button>
            ) : (
                <span className="my-recover-form__success">
                    {response.message || "Correo enviado con éxito"}
                </span>
            )}

            {error && <span className="my-recover-form__error">{error.message}</span>}
        </form>
    )
}