import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../../Components/AuthComponents/LoginForm/LoginForm'
import { FaLock } from 'react-icons/fa'
import { verifyEmailWithToken } from '../../services/authService'
import './LoginScreen.css'

export default function LoginScreen() {

    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get("verifyToken")

        if (!token) return
        async function verify() {
            const result = await verifyEmailWithToken(token)
            window.history.replaceState({}, "", "/login")
        }

        verify()
    }, [])

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
                    <LoginForm />
                </div>

            </div>
        </div>
    )
}
