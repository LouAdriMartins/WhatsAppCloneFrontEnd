import React from "react"
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
//import "./NewChatHeader.css"

export default function NewChatHeader() {
    const navigate = useNavigate()

    return (
        <div className="newchat-header">
            <IoArrowBack 
                className="back-icon"
                onClick={() => navigate(-1)}  
            />
            <h2>Nuevo chat</h2>
        </div>
    )
}
