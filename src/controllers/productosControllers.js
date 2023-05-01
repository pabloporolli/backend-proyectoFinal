import logger from '../config/loggers.js'

import {
    productosDao as productosApi
} from '../models/daos/index.js'
import traerProducto from './productoPreciosDTO.js'


async function listarProductos (req, res) {
    try {
        const respuesta =  await productosApi.getAll()
        return res.json({respuesta})
    } catch (error) {
        throw new Error (`Error al hacer el getAll ${error}`)
        logger.error(error)
    }
}

const agregarProducto = async (req, res) => {
    const prod = await req.body
    const producto = {
        ...prod,
    }
    productosApi.save(producto)
    .then( respuesta => {
    res.json({respuesta, registrado: true})
    })
}

let producto;
const listarProductoByID = async (req, res) => {
    const id = parseInt(req.params.id)
    producto = await productosApi.getById(id)
    traerProducto(producto)
    res.json(producto)
}

const borrarProductoById = async (req, res) => {
    const id = parseInt(req.params.id)
    productosApi.deleteById(id)
    .then(resp =>
            resp ?
                res.send(resp)
                :
                res.send({error: "Producto no encontrado"})
        )
}

const modificarProductoById = async (req, res) => {
    const id = parseInt(req.params.id)
    const modificacion = await req.body
    productosApi.modifyById(id, modificacion)
    .then(resp =>
        resp ?
            res.send(resp)
            :
            res.send({error: "Producto no modificado"})
    )
}

export {
    listarProductos,
    agregarProducto,
    listarProductoByID,
    borrarProductoById,
    modificarProductoById,
    producto
}
