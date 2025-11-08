import React, { useState } from "react"
import { Link } from "react-router-dom"
import RecoverPasswordForm from "../../Components/AuthComponents/RecoverPasswordForm/RecoverPaswordForm.jsx"
//import "./RecoverPasswordScreen.css"

export default function RecoverPasswordScreen() {
    const [response, setResponse] = useState(null)

    return (
        <div className="recover-screen">
            <h1>Recuperar Contraseña</h1>
            <p>
                Ingresá tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>

            {!response ? (
                <RecoverPasswordForm onSuccess={setResponse} />
            ) : (
                <span className="success">
                    {response.message || "Correo enviado con éxito"}
                </span>
            )}

            <div className="recover-footer">
                <Link to="/login">
                    <button>Volver al inicio de sesión</button>
                </Link>
            </div>
        </div>
    )
}
