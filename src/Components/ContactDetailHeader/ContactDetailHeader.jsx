import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getContactByUserId } from "../../services/contactService"
import { IoArrowBack } from "react-icons/io5"
import default_image from "../../../readme-images/default-image.png"
import './ContactDetailHeader.css'

const DEFAULT_AVATAR = default_image

export default function ContactDetailHeader({ contact_user_id: propId }) {

    // Lo que viene de la URL (si estás en /messages o /detail)
    const { contact_user_id: paramId } = useParams()

    // Elegimos el ID que exista: primero el prop, luego el param
    const contactId = propId ?? paramId

    const [contactDetail, setContactDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchContact() {
            try {
                setIsLoading(true)
                setError(null)

                const data = await getContactByUserId(contactId)

                // Backend devuelve { data: {...} }
                setContactDetail(data)
                console.log("CONTACT DETAIL:", data)

            } catch (err) {
                console.error("Error al obtener contacto:", err)
                setError(err.message || "Error al cargar el contacto")
            } finally {
                setIsLoading(false)
            }
        }

        if (contactId) fetchContact()

    }, [contactId])


    if (isLoading)
        return <div className="contact-detail-header">Cargando...</div>

    if (error)
        return <div className="contact-detail-header error">{error}</div>

    if (!contactDetail) return null

    return (
        <div className="contact-detail-header">
            
            {/* Volver a /home como WhatsApp */}
            <Link to="/home" className="back-home">
                <IoArrowBack className="back-home-icon" />
            </Link>

            {/* Foto + nombre (link al detalle del contacto) */}
            <Link
                to={`/contact/${contactDetail._id}/detail`}
                className="contact-detail-header-link"
            >
                <img
                    src={contactDetail.profile_image_url || DEFAULT_AVATAR}
                    alt={`Foto de ${contactDetail.name}`}
                    className="contact-detail-header-image"
                />

                <h2 className="contact-detail-header-name">
                    {contactDetail.name}
                </h2>
            </Link>
        </div>
    )
}
