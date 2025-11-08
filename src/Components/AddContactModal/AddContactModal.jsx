// src/Components/AddContactModal/AddContactModal.jsx
import React, { useState, useContext } from "react"
import { createContact } from "../../services/contactService"
import { HomeContactContext } from "../../Context/HomeContactContext"

export default function AddContactModal({ onClose }) {
    const { reload } = useContext(HomeContactContext)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            await createContact({ name, phone_number: phone })
            await reload()
            setMessage("Contacto agregado correctamente.")

            setTimeout(() => onClose(), 1200)
        } 
        catch (error) {
            setMessage(`Error: ${error.message}`)
        } 
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Agregar nuevo contacto</h2>

                <form onSubmit={handleSubmit}>
                
                <label>Nombre:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>Teléfono:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <div className="modal-buttons">
                    <button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Agregar"}
                    </button>

                    <button type="button" onClick={onClose}>
                    Cancelar
                    </button>
                </div>

                {message && <p className="modal-message">{message}</p>}
                </form>
            </div>
        </div>
    )
}
