


import {
    productosDao as productosApi
} from '../models/daos/index.js'



const listarProductos = async (req, res) => {
    const respuesta =  await productosApi.getAll()
    res.json({respuesta})
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


export {
    listarProductos,
    agregarProducto
}
