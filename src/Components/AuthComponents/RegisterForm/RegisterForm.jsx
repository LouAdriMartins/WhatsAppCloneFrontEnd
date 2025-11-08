import React from "react"
import useForm from "../../../Hooks/useForm.js"
import useFetch from "../../../Hooks/useFetch.js"
import { register } from "../../../services/authService.js"
import "./RegisterForm.css"

const FORM_FIELDS = {
    NAME: "name",
    EMAIL: "email",
    PASSWORD: "password",
}

const initial_form_state = {
    [FORM_FIELDS.NAME]: "",
    [FORM_FIELDS.EMAIL]: "",
    [FORM_FIELDS.PASSWORD]: "",
}

export default function RegisterForm() {
    const { sendRequest, loading, response, error } = useFetch()

    const onRegister = (form_state) => {
        sendRequest(() =>
        register(
            form_state[FORM_FIELDS.NAME],
            form_state[FORM_FIELDS.EMAIL],
            form_state[FORM_FIELDS.PASSWORD]
        )
        )
    }

    const { form_state, handleSubmit, handleInputChange } = useForm({
        initial_form_state,
        onSubmit: onRegister,
    })

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor={FORM_FIELDS.NAME}>Nombre:</label>
                <input
                    name={FORM_FIELDS.NAME}
                    id={FORM_FIELDS.NAME}
                    type="text"
                    onChange={handleInputChange}
                    value={form_state[FORM_FIELDS.NAME]}
                />
            </div>

            <div className="form-group">
                <label htmlFor={FORM_FIELDS.EMAIL}>Email:</label>
                <input
                    name={FORM_FIELDS.EMAIL}
                    id={FORM_FIELDS.EMAIL}
                    type="email"
                    onChange={handleInputChange}
                    value={form_state[FORM_FIELDS.EMAIL]}
                />
            </div>

            <div className="form-group">
                <label htmlFor={FORM_FIELDS.PASSWORD}>Contraseña:</label>
                <input
                    name={FORM_FIELDS.PASSWORD}
                    id={FORM_FIELDS.PASSWORD}
                    type="password"
                    onChange={handleInputChange}
                    value={form_state[FORM_FIELDS.PASSWORD]}
                />
            </div>

            {!response ? (
                <button type="submit" disabled={loading}>
                    {loading ? "Registrando..." : "Registrarse"}
                </button>
            ) : (
                <>
                <button type="submit" disabled>
                    Registrado
                </button>
                <span className="success">{response.message}</span>
                </>
            )}

            {error && <span className="error">{error.message}</span>}
        </form>
    )
}
