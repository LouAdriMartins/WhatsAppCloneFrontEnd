import React from "react";
import { FaCommentDots, FaRegCircle, FaUsers, FaBullhorn, FaCog } from "react-icons/fa";
import "./Sidebar.css";
import myPhoto from '../../Data/Images/mi-foto.webp'

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <img src={myPhoto} alt="Mi foto" className="sidebar-avatar" />
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