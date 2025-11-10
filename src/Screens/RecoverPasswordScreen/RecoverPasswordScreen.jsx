import React, { useState } from "react"
import { Link } from "react-router-dom"
import RecoverPasswordForm from "../../Components/AuthComponents/RecoverPasswordForm/RecoverPaswordForm.jsx"
import "./RecoverPasswordScreen.css"

export default function RecoverPasswordScreen() {
    const [response, setResponse] = useState(null)

    return (
        <div className="recover-screen">

            {!response ? (
                <RecoverPasswordForm onSuccess={setResponse} />
            ) : (
                <span className="recover-screen__success">
                    {response.message || "Correo enviado con éxito"}
                </span>
            )}

            <div className="recover-screen__footer">
                <Link to="/login" className="recover-screen__back-link">
                    Volver al inicio de sesión
                </Link>
            </div>
        </div>
    )
}