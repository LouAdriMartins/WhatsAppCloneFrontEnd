import React, { useState, useContext, useEffect, useRef } from "react"
import { createContact } from "../../services/contactService"
import { HomeContactContext } from "../../Context/HomeContactContext"
import { IoClose } from "react-icons/io5"
import "./NewContactForm.css"

export default function NewContactForm({ onClose }) {
    const { reload } = useContext(HomeContactContext)

    const [name, setName]   = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const inputRef = useRef(null)
    useEffect(() => { inputRef.current?.focus(); }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
        await createContact({ name, contact_email: email, phone_number: phone })
        await reload();
        setMessage("Contacto agregado correctamente")

        // limpiar
        setName(""); setEmail(""); setPhone("")

        // cerrar luego de 1.2s
        if (onClose) setTimeout(onClose, 1200)
        } catch (err) {
        setMessage(`${err.message}`)
        } finally {
        setLoading(false)
        }
    };

    return (
        <div className="newcontact__container">
            <div className="newcontact__header">
                <h2>Nuevo contacto</h2>
                <button
                type="button"
                className="newcontact__close"
                onClick={onClose}
                aria-label="Cerrar"
                title="Cerrar"
                >
                <IoClose />
                </button>
            </div>

            <form className="newcontact__form" onSubmit={handleSubmit}>
                <label>Nombre (alias):</label>
                <input
                    ref={inputRef}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>Email del contacto:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Teléfono (opcional):</label>
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Guardando..." : "Agregar"}
                </button>

                {message && <p className="newcontact__msg">{message}</p>}
            </form>
        </div>
    )
}
