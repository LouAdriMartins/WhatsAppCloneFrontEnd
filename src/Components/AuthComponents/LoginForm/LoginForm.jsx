import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import useFetch from "../../../Hooks/useFetch.js"
import useForm from "../../../Hooks/useForm.js"
import { login } from "../../../services/authService.js"
import LOCALSTORAGE_KEYS from "../../../constants/localstorage.js"
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa"
import "./LoginForm.css"

const FORM_FIELDS = {
    EMAIL: "email",
    PASSWORD: "password"
}

const initial_form_state = {
    [FORM_FIELDS.EMAIL]: "",
    [FORM_FIELDS.PASSWORD]: ""
}

const LoginForm = () => {
    const navigate = useNavigate()
    const { sendRequest, loading, response, error } = useFetch()

    const { form_state, handleSubmit, handleInputChange } = useForm({
        initial_form_state,
        onSubmit: (form_state) =>
        sendRequest(() =>
            login(form_state[FORM_FIELDS.EMAIL], form_state[FORM_FIELDS.PASSWORD])
        )
    })

    useEffect(() => {
        if (response?.ok) {
            localStorage.setItem(
                LOCALSTORAGE_KEYS.AUTH_TOKEN,
                response.data.token
            )
            navigate("/home")
        }
    }, [response, navigate])

    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <FaEnvelope className="form-icon" />
                <input
                    name={FORM_FIELDS.EMAIL}
                    id={FORM_FIELDS.EMAIL}
                    type="email"
                    placeholder="Correo electrónico"
                    onChange={handleInputChange}
                    value={form_state[FORM_FIELDS.EMAIL]}
                    required
                />
                </div>

                <div className="form-group">
                    <FaLock className="form-icon" />
                <input
                    name={FORM_FIELDS.PASSWORD}
                    id={FORM_FIELDS.PASSWORD}
                    type="password"
                    placeholder="Contraseña"
                    onChange={handleInputChange}
                    value={form_state[FORM_FIELDS.PASSWORD]}
                    required
                />
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Iniciando..." : <>Ingresar <FaArrowRight /></>}
                </button>

                {error && <span className="error-text">{error.message}</span>}

                <div className="login-links">
                    <Link to="/recover-password" className="login-link">
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <Link to="/register" className="login-link">
                        Crear cuenta nueva
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
