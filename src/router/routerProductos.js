import session from 'express-session'
import { Router } from "express";
import config from "../config/config.js";
import mongoose from "mongoose";
import {
    listarProductos,
    agregarProducto,
    borrarProductoById
} from '../controllers/productosControllers.js'

const routerProductos = Router()




//----------RUTAS-------------//
routerProductos.get('/', listarProductos)

routerProductos.post('/', agregarProducto)

routerProductos.delete('/', borrarProductoById)


export default routerProductos
