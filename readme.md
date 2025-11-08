Final - FrontEnd.
Profs: Matias Gimenez - Lautaro Miceli.
Estudiante: Lourdes Adriana Martins Rodríguez.

# Desafío de creación de WhatsApp

## Librerías usadas

- react-router: Usada para enrutamientos, Links y useParams (que me permite obtener la lista de parámetros de busqueda).
- react-icons: Para el uso de íconos.

## Estructura de mi Proyecto:

En la ruta "./readme-images" se encuentran tres diagramas que corresponden a cada una de las pantallas utilizadas en el proyecto. En ellos se detalla la funcionalidad de sus respectivos componentes.

## Creación de contextos:

### 1. Contexto para Home: "HomeContactContext"

Ruta: src/Context/HomeContactContext.jsx
Contiene la función de estado que renderiza los contactos en la pantalla de inicio. Se simula una llamada al servicio getContactList, que retorna una lista de contactos.

### 2. Contexto para mensajes de contactos: "MessageContext"

Ruta: src/Context/MessageContext.jsx
Contiene la función de estado que renderiza los mensajes en la pantalla de chat. Se simula una llamada al servicio getMessagesByContactId, que retorna los mensajes de un contacto específico.

### 3. Contexto para detalle de contacto: "ContactDetailContext"

Ruta: src/Context/ContactDetailContext.jsx
Contiene la función de estado que renderiza el detalle de cada contacto. Se simula una llamada al servicio getContactById, que retorna los datos de un contacto por su ID.

- Nota: En todos los contextos se utiliza setTimeout para simular el retraso en la carga de datos, mostrando un spinner similar al de WhatsApp. Este componente, llamado Spinner, fue creado con ayuda de IA y su CSS se personalizó a gusto.