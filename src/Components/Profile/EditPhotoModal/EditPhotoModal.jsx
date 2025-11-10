import { useState, useContext } from "react"
import { AuthContext } from "../../../Context/AuthContext"
import { uploadProfileImage, updateMyProfile } from "../../../services/userService"
import "./EditPhotoModal.css"

export default function EditPhotoModal({ onClose }) {
    const { updateUserContext } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    async function handleUpload(e) {
        const file = e.target.files[0]
        if (!file) return

        setLoading(true)
        try {
            const url = await uploadProfileImage(file)
            const updated = await updateMyProfile({ profile_image_url: url })
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
                <h2>Cambiar foto</h2>

                <input type="file" accept="image/*" onChange={handleUpload} />

                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    )
}
