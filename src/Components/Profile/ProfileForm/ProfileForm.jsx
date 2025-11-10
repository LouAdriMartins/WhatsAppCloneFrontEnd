import { useContext, useState } from "react"
import { AuthContext } from "../../../Context/AuthContext"
import { updateUserName } from "../../../services/userService"
import { FiEdit2, FiX, FiCheck } from "react-icons/fi"
import "./ProfileForm.css"

export default function ProfileForm() {
    const { user, updateUser } = useContext(AuthContext)
    const [name, setName] = useState(user?.name ?? "")
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    async function save() {
        try {
            setLoading(true)
            const updatedUser = await updateUserName(name)
            updateUser(updatedUser)
            setEditing(false)
        } catch {
            alert("Error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="profile-card">
            {/* NAME */}
            <div className="profile-item">
                <span className="label">Nombre</span>

                {!editing ? (
                    <div className="row">
                        <p className="value">{user?.name}</p>
                        <button className="icon-btn" onClick={() => setEditing(true)}>
                            <FiEdit2 />
                        </button>
                    </div>
                ) : (
                    <div className="edit-row">
                        <input
                            className="edit-input"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <button className="icon-btn confirm" onClick={save} disabled={loading}>
                            <FiCheck />
                        </button>

                        <button className="icon-btn cancel" onClick={() => setEditing(false)}>
                            <FiX />
                        </button>
                    </div>
                )}
            </div>

            {/* EMAIL */}
            <div className="profile-item">
                <span className="label">Email</span>
                <p className="value">{user?.email}</p>
            </div>
        </div>
    )
}