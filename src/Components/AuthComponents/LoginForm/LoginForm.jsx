import React, { useEffect } from "react"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import useFetch from "../../../Hooks/useFetch.js"
import useForm from "../../../Hooks/useForm.js"
import { login } from "../../../services/authService.js"
import LOCALSTORAGE_KEYS from "../../../constants/localstorage.js"
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa"
import { AuthContext } from "../../../Context/AuthContext.jsx"
//import "./LoginForm.css"

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

    const auth = useContext(AuthContext)

    useEffect(() => {
        if (response?.token && response?.user) {
            auth.login(response.user, response.token)
            navigate("/home")
        }
    }, [response, navigate])


    return (
        <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form__group">
                    <FaEnvelope className="login-form__icon" />
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

                <div className="login-form__group">
                    <FaLock className="login-form__icon" />
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

                <button type="submit" className="login-form__button" disabled={loading}>
                    {loading ? "Iniciando..." : <>Ingresar <FaArrowRight /></>}
                </button>

                {error && <span className="login-form__error-text">{error.message}</span>}

                <div className="login-form__links">
                    <Link to="/recover-password" className="login-form__link">
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <Link to="/register" className="login-form__link">
                        Crear cuenta nueva
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
