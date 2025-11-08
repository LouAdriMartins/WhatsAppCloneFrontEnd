//----------------------------------------------------DATOS DE CADA CONTACTO----------------------------------------------------------
// Archivo: src/Data/contact-mook.js
//      En este archivo se encuentran los datos de cada contacto que se muestra en la pantalla principal de la aplicacion. Puede verse 
// como una base de datos.
//------------------------------------------------------------------------------------------------------------------------------------
// Importación de imágenes para los contactos
import lolaImg from './Images/lola.webp'
import bunnyImg from './Images/bonny.jpg'
import lucasImg from './Images/lucas.jpg'
import pioImg from './Images/piolin.png'
import porkyImg from './Images/porky.jpg'
import mickImg from './Images/michael.png'
import tazImg from './Images/taz.jpg'
import silvesImg from './Images/Silves.jpg'
//------------------------------------------------------------------------------------------------------------------------------------

const mook_data = {
    contacts: [
        {
            id: 1,
            name: 'Lola Bunny',
            image_route: lolaImg,
            phone: '+54 299 563 8542',
            info: 'No vuelvas a llamarme muñeca!',
            info_date: '20 de mayo del 2015',
            hora: '01/06/2025',
            last_message: {
                id: 1,
                text: 'Aprendiendo Front-End.',
                status: true,
            },
            unread_messages: 2,
            messages: [
                {
                    id: 101,
                    emisor: 'YO',
                    hora: '01/06/2025',
                    text: 'Hola que tal Lola?',
                    status: true,
                },
                {
                    id: 102,
                    emisor: 'Lola Bunny',
                    hora: '01/06/2025',
                    text: 'Todo muy bien! Y vos?',
                    status: true,
                },
            ],
        },
        {
            id: 2,
            name: 'Bugs Bunny',
            image_route: bunnyImg,
            phone: '+54 294 423 8025',
            info: '¿Qué hay de nuevo, viejo?',
            info_date: '30 de junio del 2018',
            hora: '02/07/2025',
            last_message: {
                id: 2,
                text: 'Te parece si nos juntamos el sabado que viene?',
                status: false,
            },
            unread_messages: 3,
            messages: [
                {
                    id: 101,
                    emisor: 'YO',
                    hora: '02/07/2025',
                    text: 'No sabes lo que me paso. Tenemos que juntarnos',
                    status: true,
                },
                {
                    id: 102,
                    emisor: 'Bugs Bunny',
                    hora: '02/07/2025',
                    text: 'Si, me encanta la idea, hace mucho que no nos vemos',
                    status: false,
                },
                {
                    id: 103,
                    emisor: 'Bugs Bunny',
                    hora: '02/07/2025',
                    text: 'Cuentame que te paso?',
                    status: false,
                },
            ],
        },
        {
            id: 3,
            name: 'Pato Lucas',
            image_route: lucasImg,
            phone: '+54 263 555 2082',
            info: '¡Eres despreciable!',
            info_date: '02 de enero del 2019',
            hora: '05/05/2025',
            last_message: {
                id: 3,
                text: 'Te extraño 😿',
                status: false,
            },
            unread_messages: 1,
            messages: [
                {
                    id: 101,
                    emisor: 'YO',
                    hora: '05/05/2025',
                    text: 'Hola querido Lucas, Eso que significa?',
                    status: false,
                },
                {
                    id: 102,
                    emisor: 'Pato Lucas',
                    hora: '05/05/2025',
                    text: 'Que tenemos que juntarnos a conversar ❤️',
                    status: false,
                },
            ],
        },
        {
            id: 4,
            name: 'Piolín',
            image_route: pioImg,
            phone: '+54 685 326 2856',
            info: '¡Me parecio ver un lindo gatito!',
            info_date: '15 de abril del 2020',
            hora: '25/06/2025',
            last_message: {
                id: 4,
                text: 'Tanto tiempo sin verte!!!',
                status: true,
            },
            unread_messages: 0,
            messages: [
                {
                    id: 101,
                    emisor: 'YO',
                    hora: '25/06/2025',
                    text: 'Hola, ¿cómo has estado Pio?',
                    status: true,
                },
                {
                    id: 102,
                    emisor: 'Piolín',
                    hora: '25/06/2025',
                    text: 'Muy bien, bastante ocupado creando!',
                    status: true,
                },
            ],
        },
        {
            id: 5,
            name: 'Michael Jordan',
            image_route: mickImg,
            phone: '+54 333 256 1234',
            info: 'El talento gana juegos, pero el trabajo en equipo y la inteligencia ganan campeonatos.',
            info_date: '05 de junio del 2016',
            hora: '04/04/2025',
            last_message: {
                id: 5,
                text: 'Estuve muy ataradeado en la semana.',
                status: true,
            },
            unread_messages: 0,
            messages: [
                {
                    id: 101,
                    emisor: 'YO',
                    hora: '04/04/2025',
                    text: 'Todo muy bien, y tu?',
                    status: true,
                },
                {
                    id: 102,
                    emisor: 'Michael Jordan',
                    hora: '04/04/2025',
                    text: 'Bien, ya casi termino la tarea de Front-End.',
                    status: true,
                },
            ],
        },
        {
            id: 6,
            name: 'Porky',
            image_route: porkyImg,
            phone: '+54 662 823 5325',
            info: '¡Eso es todo, amigos!',
            info_date: '03 de agosto del 2014',
            hora: '25/05/2025',
            last_message: {
                id: 6,
                text: 'Hoy es día patrio. Preparemos un buen locro!',
                status: true,
            },
            unread_messages: 0,
            messages: [
                {
                    id: 101,
                    emisor: 'YO',
                    hora: '25/05/2025',
                    text: 'Buenas, como estás? Te parece bien si hacemos algo?',
                    status: true,
                },
                {
                    id: 102,
                    emisor: 'Porky',
                    hora: '25/05/2025',
                    text: 'Perfecto, nos juntamos en casa a cocinar?',
                    status: true,
                },
            ],
        },
        {
            id: 7,
            name: 'Tazmania',
            image_route: tazImg,
            phone: '+54 321 523 2525',
            info: 'dgf#!(}*fgiufg$%$',
            info_date: '08 de Octubre del 2016',
            hora: '01/01/2025',
            last_message: {
                id: 7,
                text: 'Necesito que me expliques por favor!',
                status: true,
            },
            unread_messages: 0,
            messages: [
                {
                    id: 101,
                    emisor: 'YO',
                    hora: '23:13',
                    text: 'Qué te pasa Taz? No has ido a clase.',
                    status: true,
                },
                {
                    id: 102,
                    emisor: 'Tazmania',
                    hora: '23:16',
                    text: 'Estuve muy enfermo, recién me siento mejor.',
                    status: true,
                },
            ],
        },
        {
            id: 8,
            name: 'Silvestre',
            image_route: silvesImg,
            phone: '+54 321 222 3235',
            info: '¡Sufre, malaya, desgraciado!',
            info_date: '09 Agosto del 2016',
            hora: '03/02/2025',
            last_message: {
                id: 8,
                text: 'Mañana te muestro lo que aprendí.',
                status: true,
            },
            unread_messages: 0,
            messages: [
                {
                    id: 101,
                    emisor: 'YO',
                    hora: '23:13',
                    text: 'Como vas?',
                    status: true,
                },
                {
                    id: 102,
                    emisor: 'Tazmania',
                    hora: '23:16',
                    text: 'Muy bien, hoy estuve ejercitandome.',
                    status: true,
                },
            ],
        },
    ]
}

export default mook_data