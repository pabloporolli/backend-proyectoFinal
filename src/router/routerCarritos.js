import { Router } from "express";
const routerCarritos = Router()

import {
    verCarrito,
    agregarAlCarrito
} from '../controllers/carritosControllers.js'


//-----RUTAS-------
routerCarritos.get('/', verCarrito)

routerCarritos.post('/', agregarAlCarrito)


export default routerCarritos

