import { createContext, useEffect, useState } from "react"
import LOCALSTORAGE_KEYS from "../constants/localstorage.js"
import { getMyProfile } from "../services/userService.js"

export const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
        if (token) {
            setToken(token)
            loadUser()
        }
    }, [])

    async function loadUser() {
        try {
            const user_data = await getMyProfile()
            setUser(user_data)
        } catch (err) {
            console.log("Error cargando usuario:", err)
        }
    }

    function updateUser(updatedUser) {
        setUser(prev => ({
            ...prev,
            ...updatedUser
        }))
    }

    function logout() {
        localStorage.removeItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{ token, user, loadUser, updateUser, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
