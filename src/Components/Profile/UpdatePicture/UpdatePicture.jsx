import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../../Context/AuthContext"
import { uploadProfileImage, deleteProfileImage } from "../../../services/userService"
import { LuUpload, LuTrash2 } from "react-icons/lu"
import default_avatar from "../../../../readme-images/default-image.png"
import "./UpdatePicture.css"

export default function UpdatePicture() {
    const { user, loadUser } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const fileInput = useRef()

    async function handleUpload(event) {
        try {
            setLoading(true)
            const file = event.target.files[0]
            if (!file) return

            await uploadProfileImage(file)
            await loadUser()
        } catch (e) {
            alert("Error subiendo foto")
        } finally {
            setLoading(false)
            setMenuOpen(false)
        }
    }

    async function handleDelete() {
        try {
            setLoading(true)
            await deleteProfileImage()
            await loadUser()
        } catch (e) {
            alert("Error eliminando foto")
        } finally {
            setLoading(false)
            setMenuOpen(false)
        }
    }

    return (
        <div className="picture-container">
            <div className="picture-wrapper" onClick={() => setMenuOpen(!menuOpen)}>
                <img
                    src={user?.profile_image_url || default_avatar}
                    alt="Perfil"
                    className="profile-img"
                />

                {/* hover cuando NO está cargando */}
                {!loading && (
                    <div className="picture-edit">
                        <LuUpload size={22} />
                    </div>
                )}

                {/* overlay LOADING cuando sí está cargando */}
                {loading && (
                    <div className="picture-loading">
                        <div className="spinner" />
                        <span>Cargando...</span>
                    </div>
                )}
            </div>

            {menuOpen && !loading && (
                <div className="picture-menu">
                    <button onClick={() => fileInput.current.click()}>
                        <LuUpload /> Subir foto
                    </button>
                    <button className="danger" onClick={handleDelete}>
                        <LuTrash2 /> Eliminar foto
                    </button>
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                ref={fileInput}
                onChange={handleUpload}
                hidden
            />
        </div>
    )
}
