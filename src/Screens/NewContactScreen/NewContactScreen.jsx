import React from "react"
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import NewContactForm from "../../Components/NewContact/NewContactForm"
//import "./NewContactScreen.css"

export default function NewContactScreen() {
    const navigate = useNavigate()

    return (
        <div className="newcontact-container">
            <div className="newcontact-header">
                <IoArrowBack className="newcontact-back" onClick={() => navigate(-1)} />
                <h2>Nuevo contacto</h2>
            </div>
            <NewContactForm />
        </div>
    )
}
