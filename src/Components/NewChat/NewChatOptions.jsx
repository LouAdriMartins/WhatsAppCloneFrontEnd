// src/Components/NewChat/NewChatOptions.jsx
import React from "react"
import { Link } from "react-router-dom"

export default function NewChatOptions({ onAddContact }) {
    return (
        <div className="newchat-options">
            <Link to="/new-group" className="newchat-option-row">
                👥 Nuevo grupo
            </Link>
            <Link to="/new-contact" className="newchat-option-row">
                👤 Nuevo contacto
            </Link>
            <div className="newchat-option-row disabled">
                <span>📣</span> Nuevo canal
            </div>
        </div>
    )
}