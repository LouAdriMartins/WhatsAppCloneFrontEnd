import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getContactById } from "../../services/contactService"
import { IoArrowBack } from "react-icons/io5"
import './ContactDetailHeader.css'

export default function ContactDetailHeader() {
    const { contact_id } = useParams()
    const [contactDetail, setContactDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchContact() {
            try {
                setIsLoading(true)
                setError(null)
                const data = await getContactById(contact_id)
                setContactDetail(data)
            } 
            catch (err) {
                console.error("Error al obtener el contacto:", err)
                setError(err.message || "Error al cargar el contacto")
            } 
            finally {
                setIsLoading(false)
            }
            }

        if (contact_id) {
            fetchContact()
        }
    }, [contact_id])

    if (isLoading) return <div className="contact-detail-header">Cargando...</div>
    if (error) return <div className="contact-detail-header error">{error}</div>
    if (!contactDetail) return null

    return (
        <div className="contact-detail-header">
            <Link to="/" className="back-home">
                <IoArrowBack className="back-home-icon" />
            </Link>
            <Link
                to={`/contact/${contact_id}/detail`}
                className="contact-detail-header-link"
            >
                <img
                src={contactDetail.profile_image_url || "/placeholder.svg"}
                alt={`Foto de ${contactDetail.name}`}
                className="contact-detail-header-image"
                />
                <h2 className="contact-detail-header-name">{contactDetail.name}</h2>
            </Link>
        </div>
    )
}