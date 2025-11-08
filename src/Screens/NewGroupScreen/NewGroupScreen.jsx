import React from "react"
import { Link } from "react-router-dom"

export default function NewGroupScreen() {
    return (
        <div style={{ padding: "20px" }}>
            <h2>Crear nuevo grupo</h2>
            <p>Pantalla de construcción…</p>

            <Link to="/new-chat">⬅ Volver</Link>
        </div>
    )
}
