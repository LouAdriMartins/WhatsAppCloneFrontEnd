import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../../Context/AuthContext"
import { updateMyProfile } from "../../../services/userService"
import { FiEdit2, FiCheck, FiX } from "react-icons/fi"
import "./ProfileForm.css"

export default function ProfileForm() {
    const { user, updateUser } = useContext(AuthContext)

    const [editingField, setEditingField] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState({
        name: user?.name ?? "",
        info: user?.info ?? "",
        phone_number: user?.phone_number ?? "",
    })

    useEffect(() => {
        setFormValues({
            name: user?.name ?? "",
            info: user?.info ?? "",
            phone_number: user?.phone_number ?? "",
        })
    }, [user])

    function handleChange(field, value) {
        setFormValues(prev => ({ ...prev, [field]: value }))
    }

    async function save(field) {
        try {
            setLoading(true)

            const updatedUser = await updateMyProfile({
                [field]: formValues[field],
            })

            updateUser(updatedUser)
            setEditingField(null)

        } catch (err) {
            alert("Error guardando cambios")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="profile-card">
            {["name", "info", "phone_number"].map(field => (
                <div className="profile-item" key={field}>
                    <span className="label">
                        {field === "name" && "Nombre"}
                        {field === "info" && "Info"}
                        {field === "phone_number" && "Teléfono"}
                    </span>

                    {editingField !== field ? (
                        <div className="row">
                            <p className="value">
                                {formValues[field] || (field === "info" ? "Sin info" : "No definido")}
                            </p>

                            <button className="icon-btn" onClick={() => setEditingField(field)}>
                                <FiEdit2 />
                            </button>
                        </div>
                    ) : (
                        <div className="edit-row">
                            <input
                                className="edit-input"
                                value={formValues[field]}
                                onChange={e => handleChange(field, e.target.value)}
                            />

                            <button
                                className="icon-btn confirm"
                                onClick={() => save(field)}
                                disabled={loading}
                            >
                                <FiCheck />
                            </button>

                            <button
                                className="icon-btn cancel"
                                onClick={() => setEditingField(null)}
                                disabled={loading}
                            >
                                <FiX />
                            </button>
                        </div>
                    )}
                </div>
            ))}

            <div className="profile-item">
                <span className="label">Email</span>
                <p className="value">{user?.email}</p>
            </div>
        </div>
    )
}
