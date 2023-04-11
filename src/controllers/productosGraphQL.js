import {
    productosDao as productosApi,
} from '../models/daos/index.js'



export const getProductos = async () =>{
    const productos = await productosApi.getAll()
    return productos
}


export const getProductoById = async ({id}) =>{
    const producto = await productosApi.getById(id)

    if (!producto) {
        throw new Error ('Producto no encontrado')
    }
    else return producto[0]
}

export const borrarProductoById = async ({id}) => {
    const producto = await productosApi.deleteById(id)
    if (!producto) {
        throw new Error ('Producto no encontrado')
    }
    else return producto[0]
}

export const modificarProductoById = (req,res) =>{
    let id = req.params.id
    let timestamp= Date.now()

    let cambios = {
        ...req.body,
        timestamp:timestamp
    }
    productosApi.modifyById(id, cambios)

    .then((id)=>{
        return id
    })
}

export const crearProducto = async ({datos}) =>{
    const timestamp = Date.now()

    let producto = {
        ...datos,
        timestamp: timestamp
    }

    const idNuevo = await productosApi.save(datos)

    return {
        id: idNuevo,
        
    }
}