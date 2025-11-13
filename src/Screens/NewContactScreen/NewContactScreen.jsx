import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UIModal from "../../Components/UIModal/UIModal";
import NewContactForm from "../../Components/NewContactForm/NewContactForm";

export default function NewContactScreen() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        navigate("/new-chat"); // volver a la pantalla anterior
    };

    return (
        <div className="new-contact-screen">
            {open && (
                <UIModal onClose={handleClose}>
                <NewContactForm onClose={handleClose} />
                </UIModal>
            )}
        </div>
    )
}
