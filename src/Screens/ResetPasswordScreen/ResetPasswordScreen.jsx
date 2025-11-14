import React, { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import ResetPasswordForm from "../../Components/AuthComponents/ResetPasswordForm/ResetPasswordForm.jsx"
import "./ResetPasswordScreen.css"

export default function ResetPasswordScreen() {
    onst [params] = useSearchParams()
    const token = params.get("token") 
    const navigate = useNavigate()
    const [response, setResponse] = useState(null)

    return (
        <div className="reset-screen">

            {!response ? (
                <ResetPasswordForm token={token} onSuccess={setResponse} />
            ) : (
                <div className="reset-screen__done">
                    <p className="reset-screen__success">
                        {response.message}
                    </p>

                    <button
                        className="reset-screen__back-btn"
                        onClick={() => navigate("/login")}
                    >
                        Volver al login
                    </button>
                </div>
            )}

        </div>
    )
}
