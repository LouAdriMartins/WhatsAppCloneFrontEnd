import React, { useState, useContext } from "react"
import { createContact } from "../../services/contactService"
import { HomeContactContext } from "../../Context/HomeContactContext"

export default function NewContactForm() {
    const { reload } = useContext(HomeContactContext)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            await createContact({
                name,
                contact_email: email,
                phone_number: phone
        })

        await reload()
        setMessage("Contacto agregado correctamente")

        // limpiar
        setName("")
        setEmail("")
        setPhone("")

        } 
        catch (err) {
            setMessage(err.message)
        } 
        finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="new-contact-form">
            <label>Nombre (alias):</label>
            <input
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

            {message && <p>{message}</p>}
        </form>
    )
}
