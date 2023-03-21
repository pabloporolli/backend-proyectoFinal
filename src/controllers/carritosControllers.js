import { enviarMail, enviarWA } from '../gestionMensajes/mensajes.js'

import {
    carritosDao as carritosApi
} from '../models/daos/index.js'

const verCarrito = async (req, res) => {
    const resp = await carritosApi.getAll()
    res.json({carrito: resp})
}


// Crea un carrito y asigna un id
const agregarAlCarrito = async (req, res) => {
    let timestamp = Date.now()
    let productos = await req.body
    let nuevoCarrito = {
        items: productos,
        cart_timestamp: timestamp
    }
    console.log(nuevoCarrito);
    carritosApi.guardar(nuevoCarrito)
    .then(id => res.send(`Carrito creado con el id ${id}`))
    await enviarMail()
    await enviarWA()
}



export {
    verCarrito,
    agregarAlCarrito
}