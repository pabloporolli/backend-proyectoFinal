import { enviarMail, enviarWA } from '../gestionMensajes/mensajes.js'
import logger from '../config/loggers.js'

import {
    carritosDao as carritosApi,
    productosDao as productosApi
} from '../models/daos/index.js'

const verCarritos = async (req, res) => {
    const resp = await carritosApi.getAll()
    res.json({carrito: resp})
}


// Crea un carrito y asigna un id
const agregarAlCarrito = async (req, res) => {
    let timestamp = Date.now()
    let productos = await req.body
    let nuevoCarrito = {
        productos: productos,
        cart_timestamp: timestamp
    }
    carritosApi.guardar(nuevoCarrito)
    .then(id => res.send(`Carrito creado con el id ${id}`))
    await enviarMail()
    await enviarWA()
}

const agregarProdAlCarrito = (req,res) =>{

    let id = req.params.id
    let id_prod =req.params.id_prod

    let id_prod_parseado = parseInt(id_prod)
    if (`"${id_prod_parseado}"`=== id_prod){
        id_prod = id_prod_parseado
    }    
    
    productosApi.getById(id_prod)

    .then((productoNuevo)=>{
        carritosApi.getById(id)
        .then((carritoAActualizar) =>{
            let products = carritoAActualizar[0]["productos"]
            products.push(productoNuevo[0])
            let cart_timestamp = Date.now()
            carritosApi.modifyById(id, {"productos": products, cart_timestamp})
            res.send(`Producto ${id_prod} agregado al carrito ${id}`)
        })
        .catch((err) =>{
            res.send("Error al actualizar el carrito" + err)
        })
    })
}

let carrito
const verUnCarrito = async (req, res) => {
    let numeroCarrito = parseInt(req.params.id)
    carrito = await carritosApi.getById(numeroCarrito)
    res.json(carrito)
}

const borrarCarritoById = async (req, res) => {
    const id = parseInt(req.params.id)
    carritosApi.deleteById(id)
    .then(resp =>
            resp ?
                res.send(resp)
                :
                res.send({error: "Carrito no encontrado"})
        )
}

const borrarItemDelCarrito = (req,res) =>{
    let id = req.params.id
    let id_prod = req.params.id_prod
    // Parsea el id producto solo si es un numero-  lo deja igual si es un string
    !isNaN(parseInt(id_prod)) && (id_prod = parseInt(id_prod))
    
    carritosApi.getById(id)
    .then((carrito)=>{
        let prods= carrito[0]["productos"][0]["items"]
        let index = prods.findIndex((el) => el.id === id_prod)
        if (index === -1){
            res.send('Error: Este producto no se encuentra en el carrito')
            return
        }
        prods.splice(index,1)
        let cart_timestamp = Date.now()
        carritosApi.modifyById(id, {"productos": prods, cart_timestamp})
        res.send("Producto eliminado")
    })
    .catch(err => {
        logger.error(err)
        res.send(`Error: el carrito no existe - ${err}`)
    }) 
}

const finalizarCompra = async (req, res) => {
    let id = req.params.id
    let carrito = await carritosApi.getById(id)
    res.json({compra: carrito})
}

export {
    verCarritos,
    agregarAlCarrito,
    verUnCarrito,
    borrarCarritoById,
    borrarItemDelCarrito,
    agregarProdAlCarrito,
    finalizarCompra
}