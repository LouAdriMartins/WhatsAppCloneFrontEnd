import { FaEdit, FaEllipsisV } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import "./TopBar.css"

export default function TopBar() {
    const navigate = useNavigate()
    const goToNewChat = () => navigate("/new-chat")

    return (
        <div className="top-bar">
            <h1 className="top-bar-title">WhatsApp</h1>
            <div className="top-bar-icons">
                <FaEdit className="top-bar-icon" title="Nuevo chat" onClick={goToNewChat}/>
                <FaEllipsisV className="top-bar-icon" title="Menú" />
            </div>
        </div>
    )
}
