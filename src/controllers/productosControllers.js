


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
    }
}

const agregarProducto = async (req, res) => {
    const prod = await req.body
    console.log("prod: ", prod)
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


export {
    listarProductos,
    agregarProducto,
    listarProductoByID,
    producto
}
