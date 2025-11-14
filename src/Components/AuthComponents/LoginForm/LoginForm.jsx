import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import useFetch from "../../../Hooks/useFetch.js"
import useForm from "../../../Hooks/useForm.js"
import { login, verifyEmailToken } from "../../../services/authService.js"
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa"
import LOCALSTORAGE_KEYS from "../../../constants/localstorage.js"
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
        const params = new URLSearchParams(window.location.search)
        const verifyToken = params.get("verifyToken")
        if (!verifyToken) return
        async function runVerification() {
            await verifyEmailToken(verifyToken)
            window.history.replaceState({}, "", "/")   // limpiar URL
        }
        runVerification()
    }, [])

    useEffect(() => {
    if (response?.ok) {
        // Guardar token
        localStorage.setItem(
            LOCALSTORAGE_KEYS.AUTH_TOKEN,
            response.data.token
        )
        // Redirigir
        navigate("/home")
    }
}, [response, navigate])


    return (
        <div className="my-login-form__container">
            <form onSubmit={handleSubmit} className="my-login-form">
                <div className="my-login-form__group">
                    <FaEnvelope className="my-login-form__icon" />
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

                <div className="my-login-form__group">
                    <FaLock className="my-login-form__icon" />
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

                <button type="submit" className="my-login-form__button" disabled={loading}>
                    {loading ? "Iniciando..." : <>Ingresar <FaArrowRight /></>}
                </button>

                {error && <span className="my-login-form__error-text">{error.message}</span>}
                <div className="my-login-form__links">
                    <Link to="/recover-password" className="my-login-form__link">
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <Link to="/register" className="my-login-form__link">
                        Crear cuenta nueva
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
