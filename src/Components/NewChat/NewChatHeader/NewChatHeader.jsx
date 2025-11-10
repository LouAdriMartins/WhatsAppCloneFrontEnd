import React from "react"
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import ContactSearchInput from "../../ContactSearch/ContactSearch"
import "./NewChatHeader.css"

export default function NewChatHeader() {
    const navigate = useNavigate()

    return (
        <div className="newchat-header">
            <div 
                className="newchat-header__back"
                onClick={() => navigate(-1)}
            >
                <IoArrowBack className="newchat-header__back-icon" />
                <h2>Nuevo chat</h2>
            </div>

            <ContactSearchInput />
        </div>
    )
}
