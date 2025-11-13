import { useContext, useEffect } from "react"
import { useParams, Link } from "react-router"
import { IoArrowBack } from "react-icons/io5"
import { ContactDetailContext } from "../../Context/ContactDetailContext"
import LoaderSpinner from "../LoaderSppiner/LoaderSpinner"
import default_image from "../../../readme-images/default-image.png"
import "./ContactDetailInfo.css"

const DEFAULT_AVATAR = default_image

export default function ContactDetailInfo() {
  const { contact_user_id } = useParams()
  const { loadContact, isLoadingDetail, contactDetail } = useContext(ContactDetailContext)

  useEffect(() => {
    if (contact_user_id) {
      loadContact(contact_user_id)
    }
  }, [contact_user_id])

  if (isLoadingDetail) return <LoaderSpinner />

  if (!contactDetail) {
    return (
      <div className="contact-detail-container">
        <p>No se encontró información del contacto.</p>
      </div>
    )
  }

  const userIdForChat = contactDetail.contact_user_id

  return (
    <div className="contact-detail-container">

      {/* BOTÓN VOLVER AL CHAT */}
      <Link 
        to={`/contact/${userIdForChat}/messages`} 
        className="back-message"
      >
        <IoArrowBack className="back-message-icon" />
      </Link>

      {/* HEADER */}
      <div className="contact-detail--header">
        <div className="contact-detail-photo">
          <img
            src={contactDetail.profile_image_url || DEFAULT_AVATAR}
            alt={`Imagen de ${contactDetail.name}`}
          />
        </div>

        <h1 className="contact-detail-name">{contactDetail.name}</h1>

        <span className="contact-detail-phone">
          {contactDetail.phone_number || "Sin número"}
        </span>
      </div>

      {/* INFO */}
      <div className="contact-detail-info-section">

        <div className="contact-detail-info-item">
          <div className="contact-detail-info-label">Email</div>
          <div className="contact-detail-info-content">
            <div className="contact-detail-info-text">
              {contactDetail.contact_email || "Sin email"}
            </div>
          </div>
        </div>

        <div className="contact-detail-info-item">
          <div className="contact-detail-info-label">Agregado</div>
          <div className="contact-detail-info-content">
            <div className="contact-detail-info-date">
              {new Date(contactDetail.createdAt).toLocaleDateString("es-AR")}
            </div>
          </div>
        </div>

        {/* SECCIÓN DE ARCHIVOS */}
        <div className="contact-detail-media-section">
          <div className="media-section-header">
            <span className="media-section-title">Archivos, enlaces y documentos</span>
            <span className="media-section-count">0</span>
          </div>

          <div className="contact-detail-media-tabs">
            <button className="contact-detail-media-tab active">Medios</button>
            <button className="contact-detail-media-tab">Enlaces</button>
            <button className="contact-detail-media-tab">Documentos</button>
          </div>

          <div className="contact-detail-media-empty">
            <span>No hay archivos compartidos</span>
          </div>
        </div>

        {/* ACCIONES */}
        <div className="contact-detail--actions">
          <div className="contact-detail-action-item">
            <div className="contact-detail-action-icon">🔇</div>
            <span className="contact-detail-action-text">Silenciar notificaciones</span>
          </div>

          <div className="contact-detail-action-item">
            <div className="contact-detail-action-icon">🎨</div>
            <span className="contact-detail-action-text">Fondo de pantalla</span>
          </div>

          <div className="contact-detail-action-item">
            <div className="contact-detail-action-icon">⭐</div>
            <span className="contact-detail-action-text">Mensajes destacados</span>
          </div>
        </div>

        {/* ZONA PELIGRO */}
        <div className="contact-detail-actions danger">
          <div className="contact-detail-action-item">
            <div className="contact-detail-action-icon">🚫</div>
            <span className="contact-detail-action-text">Bloquear contacto</span>
          </div>
          <div className="contact-detail-action-item">
            <div className="contact-detail-action-icon">👤</div>
            <span className="contact-detail-action-text">Reportar contacto</span>
          </div>
          <div className="contact-detail-action-item">
            <div className="contact-detail-action-icon">🗑️</div>
            <span className="contact-detail-action-text">Eliminar chat</span>
          </div>
        </div>

      </div>
    </div>
  )
}
