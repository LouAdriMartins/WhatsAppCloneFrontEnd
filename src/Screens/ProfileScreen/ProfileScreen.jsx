import React from "react"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"

export default function ProfileScreen() {
    const { user } = useContext(AuthContext)

    if (!user) return <h2>No hay usuario</h2>

    return (
        <div className="profile-screen">
            <img
                src={user.profile_image_url || "/placeholder.svg"}
                className="big-avatar"
            />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
        </div>
    )
}