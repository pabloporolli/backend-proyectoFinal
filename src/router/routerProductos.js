import session from 'express-session'
import { Router } from "express";
import config from "../config/config.js";
import mongoose from "mongoose";
import {
    listarProductos,
    agregarProducto,
    borrarProductoById,
    listarProductoByID,
    modificarProductoById
} from '../controllers/productosControllers.js'

const routerProductos = Router()

//---------Solo Admin----------//
const soloAdmins = (req, res, next) =>{
    const esAdmin = req.session.passport.user.admin
    if (!esAdmin){
        res.json((enviarErrorAuth(req.url, req.method)))
    }
    else{
        next()
    }
}

//-----Aclaraciones sobre soloAdmins-----//
// Para realizar las pruebas desde Postman, se debe sacar el middleware de soloAdmins
// de las rutas post, delete y put. Por ello, en la versión actual, no están puestos esos
// middlewares, así se puede realizar la prueba desde Postman sin problemas.

// Para probar el funcionamiento de soloAdmins, por favor, descomentar las líneas a continuación
// y comentar las líneas 34, 35 y 36:

// routerProductos.post('/', soloAdmins, agregarProducto)
// routerProductos.delete('/:id', soloAdmins, borrarProductoById)
// routerProductos.put('/:id', soloAdmins, modificarProductoById)

//----------RUTAS-------------//
routerProductos.get('/', listarProductos)

routerProductos.get('/:id', listarProductoByID)

routerProductos.post('/', agregarProducto)

routerProductos.delete('/:id', borrarProductoById)

routerProductos.put('/:id', modificarProductoById)


export default routerProductos
