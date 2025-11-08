//---------------------------------------------------PSEUDO SERVICIO MESSAGE---------------------------------------------------------
// Archivo: src/Service/messageService.js
// En este archivo se tiene la función que retorna los mensajes de un contacto específico. Trabaja sobre el mook de datos de contactos.
//------------------------------------------------------------------------------------------------------------------------------------
import mook_data from "../Data/contact-mook"

export const getMessagesByContactId = (contact_id) => {
    for (const contact of mook_data.contacts) {
        if (Number(contact.id) === Number(contact_id)) {
            return contact.messages;
        }
    }
    return null
}