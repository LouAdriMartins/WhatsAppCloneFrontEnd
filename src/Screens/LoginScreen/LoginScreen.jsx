import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from '../../Components/AuthComponents/LoginForm/LoginForm'
import { FaLock } from 'react-icons/fa'
import './LoginScreen.css'

export default function LoginScreen() {
    // Estado para mostrar el mensaje
    const [verifiedMessage, setVerifiedMessage] = useState("");
    const location = useLocation();

    // Detectar ?verified=true
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("verified") === "true") {
            setVerifiedMessage("Tu email fue verificado correctamente. Ya podés iniciar sesión.");
            // Limpia el mensaje después de 5 segundos
            setTimeout(() => setVerifiedMessage(""), 5000);
        }
    }, [location]);

    return (
        <div className="login-screen">
            <div className="login-screen__box">

                <div className="login-screen__header">
                    <h1 className="login-screen__title">
                        <FaLock className="login-screen__title-icon" />
                        Iniciar Sesión
                    </h1>
                </div>

                <div className="login-screen__content">

                    {/* Mensaje de verificación */}
                    {verifiedMessage && (
                        <div className="verified-alert">
                            {verifiedMessage}
                        </div>
                    )}

                    <LoginForm />
                </div>

            </div>
        </div>
    )
}
