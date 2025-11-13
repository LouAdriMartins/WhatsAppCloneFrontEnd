import React from "react"
import "./UIModal.css"

export default function UIModal({ children, onClose }) {
    const handleOverlayClick = (e) => {
        // cierra solo si clicás FUERA de la caja
        if (e.target === e.currentTarget) onClose?.()
    }

    return (
        <div className="ui-modal__overlay" onClick={handleOverlayClick}>
            <div className="ui-modal__content">
                {children}
            </div>
        </div>
    )
}
