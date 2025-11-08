import React from "react";
import "./LoaderSpinner.css";
import WhatsAppIcon from "./WhatsAppIcon";

export default function LoaderSpinner({ isLoading = true }) {
    if (!isLoading) return null;

    return (
        <div
            className="loading-container"
            role="alert"
            aria-busy="true"
            aria-label="Cargando"
        >
            <div className="loading-content">
                <div className="logo-container">
                    <div className="logo-wrapper">
                        <div className="logo-background">
                            <WhatsAppIcon className="logo-icon" />
                        </div>

                        <div className="pulse-effect" />
                    </div>
                </div> 

                <div className="text-container">
                    <h2 className="title">WhatsApp</h2>
                    <p className="subtitle">Cargando...</p>
                </div>

                <div className="dots-container">
                    <div className="dot dot-1" />
                    <div className="dot dot-2" />
                    <div className="dot dot-3" />
                </div>

                <div className="spinner-circle" />
            </div> 
        </div>
    )
}