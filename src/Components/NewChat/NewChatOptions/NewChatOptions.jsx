import React from "react"
import { Link } from "react-router-dom"
import { MdGroups } from "react-icons/md"
import { MdPersonAddAlt1 } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md"
import "./NewChatOptions.css"

export default function NewChatOptions({ onAddContact }) {
    return (
        <div className="newchat-options">
            <Link to="/new-group" className="newchat-option-row">
                <MdGroupAdd className="bi" />
                <span>Nuevo grupo</span>
            </Link>
            <Link to="/new-contact" className="newchat-option-row">
                <MdPersonAddAlt1 className="bi" />
                <span>Nuevo contacto</span>
            </Link>
            <div className="newchat-option-row disabled">
                <MdGroups className="bi" />
                <span>Nueva comunidad</span> 
            </div>
        </div>
    )
}