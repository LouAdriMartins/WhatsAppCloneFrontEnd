import React from "react"
import RegisterForm from "../../Components/AuthComponents/RegisterForm/RegisterForm.jsx"
import { Link } from "react-router-dom"
import "./RegisterScreen.css"

export default function RegisterScreen() {
    return (
        <div className="register-screen">
            <h1 className="register-title">Crear cuenta</h1>
            <RegisterForm />
            <div className="register-footer">
                <span>¿Ya tienes una cuenta?</span>
                <Link to="/login">
                <button>Inicia sesión</button>
                </Link>
            </div>
        </div>
    )
}
