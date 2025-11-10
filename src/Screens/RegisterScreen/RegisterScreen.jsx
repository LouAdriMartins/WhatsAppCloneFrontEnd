import React from "react"
import RegisterForm from "../../Components/AuthComponents/RegisterForm/RegisterForm.jsx"
import { Link } from "react-router-dom"
import defaultAvatar from "../../../readme-images/default-image.png"
import "./RegisterScreen.css"

export default function RegisterScreen() {
    return (
        <div className="register-screen">

            <div className="register-screen__avatar-wrapper">
                <img 
                    src={defaultAvatar}
                    alt="avatar"
                    className="register-screen__avatar"
                />
            </div>

            <div className="register-screen__card">
                <h1 className="register-screen__title">Crear cuenta</h1>
                <p className="register-screen__subtitle">
                    Ingresá tus datos para registrarte
                </p>

                <RegisterForm />
            </div>

            <div className="register-screen__footer">
                <span className="register-screen__footer-text">
                    ¿Ya tienes una cuenta?
                </span>

                <Link to="/login" className="register-screen__footer-btn">
                    Inicia sesión
                </Link>
            </div>
        </div>
    )
}