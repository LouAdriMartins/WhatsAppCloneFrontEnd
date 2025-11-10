import React from 'react'
import LoginForm from '../../Components/AuthComponents/LoginForm/LoginForm'
import { FaLock } from 'react-icons/fa'
import './LoginScreen.css'

export default function LoginScreen() {
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