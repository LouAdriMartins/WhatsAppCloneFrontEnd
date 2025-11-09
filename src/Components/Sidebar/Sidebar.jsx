import React from "react"
import { useContext } from "react"
import { FaCommentDots, FaRegCircle, FaUsers, FaBullhorn, FaCog } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext"
import "./Sidebar.css"

export default function Sidebar() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <div className="sidebar">
            <div
                className="profile-section"
                onClick={() => navigate("/profile")}
            >
                <img
                    src={user?.profile_image_url || "/placeholder.svg"}
                    className="sidebar-avatar"
                    alt="avatar"
                />
            </div>

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