import React, { useContext } from "react"
import { FaCommentDots, FaRegCircle, FaUsers, FaBullhorn, FaCog } from "react-icons/fa"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"
import default_image from "../../../readme-images/default-image.png"
import "./Sidebar.css"

export default function Sidebar() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <div className="sidebar">
            
            {/* CONTENEDOR DEL AVATAR */}
            <Link to="/profile" className="sidebar-avatar-container">
                <img
                    src={user?.profile_image_url || default_image}
                    className="sidebar-avatar"
                    alt="Foto perfil"
                />
            </Link>

            <div className="sidebar-menu">
                <button className="sidebar-btn"><FaCommentDots className="sidebar-icon" /> <span>Chats</span></button>
                <button className="sidebar-btn"><FaRegCircle className="sidebar-icon" /> <span>Estados</span></button>
                <button className="sidebar-btn"><FaBullhorn className="sidebar-icon" /> <span>Canales</span></button>
                <button className="sidebar-btn"><FaUsers className="sidebar-icon" /> <span>Comunidades</span></button>
                <button className="sidebar-btn"><FaCog className="sidebar-icon" /> <span>Configuración</span></button>
            </div>
        </div>
    );
}
