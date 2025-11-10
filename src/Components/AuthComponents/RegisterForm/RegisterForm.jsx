import React from "react"
import useForm from "../../../Hooks/useForm.js"
import useFetch from "../../../Hooks/useFetch.js"
import { register } from "../../../services/authService.js"
import { FaEnvelope, FaUser, FaLock, FaArrowRight } from "react-icons/fa"
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
        <form className="my-register-form" onSubmit={handleSubmit}>

            {/* Nombre */}
            <div className="my-register-form__group">
                <FaUser className="my-register-form__icon" />
                <input
                    name={FORM_FIELDS.NAME}
                    id={FORM_FIELDS.NAME}
                    type="text"
                    placeholder="Nombre"
                    className="my-register-form__input"
                    onChange={handleInputChange}
                    value={form_state[FORM_FIELDS.NAME]}
                    required
                />
            </div>

            {/* Email */}
            <div className="my-register-form__group">
                <FaEnvelope className="my-register-form__icon" />
                <input
                    name={FORM_FIELDS.EMAIL}
                    id={FORM_FIELDS.EMAIL}
                    type="email"
                    placeholder="Correo electrónico"
                    className="my-register-form__input"
                    onChange={handleInputChange}
                    value={form_state[FORM_FIELDS.EMAIL]}
                    required
                />
            </div>

            {/* Password */}
            <div className="my-register-form__group">
                <FaLock className="my-register-form__icon" />
                <input
                    name={FORM_FIELDS.PASSWORD}
                    id={FORM_FIELDS.PASSWORD}
                    type="password"
                    placeholder="Contraseña"
                    className="my-register-form__input"
                    onChange={handleInputChange}
                    value={form_state[FORM_FIELDS.PASSWORD]}
                    required
                />
            </div>

            {!response ? (
                <button
                    type="submit"
                    disabled={loading}
                    className="my-register-form__button"
                >
                    {loading ? "Registrando..." : <>Registrarse <FaArrowRight /></>}
                </button>
            ) : (
                <>
                    <span className="my-register-form__success">
                        {response.message || "Cuenta creada con éxito"}
                    </span>
                </>
            )}

            {error && (
                <span className="my-register-form__error">
                    {error.message}
                </span>
            )}

        </form>
    )
}