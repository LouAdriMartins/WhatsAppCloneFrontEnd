import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import LoginForm from '../../Components/AuthComponents/LoginForm/LoginForm'
import { FaLock } from 'react-icons/fa'
import './LoginScreen.css'

export default function LoginScreen() {
    return (
        <div className="main-layout">
            <div className="main-layout-principal">
                <div className="top-bar">
                    <h1 className="top-bar-title">
                        <FaLock className="top-bar-icon" /> Iniciar Sesión
                    </h1>
                </div>

                <div className="content-container">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
