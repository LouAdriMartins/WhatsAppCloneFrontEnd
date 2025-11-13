Final - FrontEnd.
Profs: Matias Gimenez - Lautaro Miceli.
Estudiante: Lourdes Adriana Martins Rodríguez.

# Desafío de creación de WhatsApp Clone - Documentación del Frontend

Este proyecto consiste en la construcción de un clon de WhatsApp Web utilizando React, con un enfoque modular, escalable y orientado a buenas prácticas. Se trabajó con componentes reutilizables, contextos globales, rutas dinámicas, manejo de estados, y comunicación en tiempo real mediante Sockets.

## Tecnologías y librerías utilizadas
### react-router-dom:
Utilizada para: enrutamiento entre pantallas, manejo de parámetros URL mediante useParams, navegación con <Link> y <NavLink>.
Permite una estructura de navegación muy similar a WhatsApp Web (sidebar + contenido dinámico).

### react-icons:
Librería de íconos usada en: el menú lateral, botones de acción, estados de mensajes (✓, ✓✓), botones de borrado, menú contextual del chat, formulario de nuevo contacto.

### emoji-picker-react:
Utilizada para integrar un selector de emojis en el cuadro de mensajes, similar al de WhatsApp. Para esto se aplicó un menú flotante con apertura y cierre suave.

### socket.io-client:
Esta librería trabaja en conjunto con el backend. Es usada para implementar: envío de mensajes en tiempo real, recepción instantánea, actualizaciones de estado (sent, delivered, read), eliminación de mensajes con soft delete / hard delete, sincronización entre usuarios conectados.
Es la principal encargada del comportamiento estilo WhatsApp.

## Estructura de Contextos (manejo global del estado)

### 1. AuthContext
- Ruta: src/Context/AuthContext.jsx

Gestiona: registro de usuario, login, logout, persistencia del token JWT, actualización de perfil en tiempo real (foto, nombre, info).

Este contexto es compatible con el backend y permite navegación condicional según autenticación.

#### 2. HomeContactContext
- Ruta: src/Context/HomeContactContext.jsx

Maneja todo lo relacionado a la pantalla principal: lista de chats, filtros, buscador de contactos con lógica de filtrado, recarga automática al agregar / eliminar contactos, render dinámico según la actividad del usuario.
Además consume el servicio getContactList, que obtiene desde el backend los contactos agregados.

Incluye también: spinner de carga personalizado, función reload() para forzar actualización cuando se actualiza un chat.

### 3. MessageContext
- Ruta: src/Context/MessageContext.jsx

Controla toda la pantalla de chat: carga de mensajes por chat, envío, recepción y renderizado, marcado automático como delivered y read,manejo de soft delete y hard delete, auto-scroll inteligente, listeners de socket: "message:new" "message:deleted" "message:status", también integra getMessages(chatId) y sendMessage() del backend real.

### 4. ContactDetailContext
- Ruta: src/Context/ContactDetailContext.jsx

Maneja la vista de detalles del contacto: obtención de información del usuario, foto, estado, nombre, teléfono, integración con el formulario editable, búsqueda de contacto por ID con el servicio getContactById.

## Loader con Spinner

Los tres contextos principales utilizan un setTimeout + un <LoaderSpinner />, proporcionando transiciones suaves y una experiencia realista como WhatsApp Web.

## Lógica del proyecto

Este clon incluye funcionalidades como:
- Soft Delete y Hard Delete de mensajes
Tal como WhatsApp: 
    Primer clic → “Mensaje eliminado”
    Segundo clic → eliminado del historial

- Sincronización de estados
Cuando el receptor abre el chat los mensajes pasan a read automáticamente.

- Menú contextual
En cada chat se puede borrar conversación.

- Buscador inteligente
Filtra contactos por: nombre, coincidencias parciales, orden alfabético.

## Conclusión

Este proyecto representa una implementación de un clon funcional de WhatsApp Web, utilizando herramientas modernas del ecosistema React, con una arquitectura modular y escalable. El sistema incluye comunicación en tiempo real, múltiples contextos globales, diseño responsivo y un conjunto robusto de componentes reutilizables.