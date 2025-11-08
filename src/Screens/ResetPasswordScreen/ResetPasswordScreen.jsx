import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import ResetPasswordForm from "../../Components/AuthComponents/ResetPasswordForm/ResetPasswordForm.jsx"
//import "./ResetPasswordScreen.css"

export default function ResetPasswordScreen() {
    const { token } = useParams()
    const navigate = useNavigate()
    const [response, setResponse] = useState(null)

    return (
        <div className="reset-password-screen">
            <h2>Restablecer Contraseña</h2>

            {!response ? (
                <ResetPasswordForm token={token} onSuccess={setResponse} />
            ) : (
                <>
                <p className="success">{response.message}</p>
                <button onClick={() => navigate("/login")}>Volver al login</button>
                </>
            )}
        </div>
    )
}
