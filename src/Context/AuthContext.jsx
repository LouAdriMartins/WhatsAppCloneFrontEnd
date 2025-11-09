import React from "react"
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const localUser = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if (localUser && token) {
            setUser(JSON.parse(localUser))
            setIsAuthenticated(true)
        }
    }, [])

    function login(user, token) {
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", token)
        setUser(user)
        setIsAuthenticated(true)
    }

    function logout() {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider