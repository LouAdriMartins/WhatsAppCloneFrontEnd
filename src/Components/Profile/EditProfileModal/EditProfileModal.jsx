import { useState, useContext } from "react"
import { AuthContext } from "../../../Context/AuthContext"
import { updateMyProfile } from "../../../services/userService"
import "./EditProfileModal.css"

export default function EditProfileModal({ onClose }) {
    const { user, updateUserContext } = useContext(AuthContext)
    const [name, setName] = useState(user?.name || "")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        try {
            const updated = await updateMyProfile({ name })
            updateUserContext(updated)
            onClose()
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Editar nombre</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <div className="buttons">
                        <button type="submit" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar"}
                        </button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
