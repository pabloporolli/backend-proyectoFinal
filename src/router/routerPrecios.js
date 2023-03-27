import { Router } from "express";
import config from "../config/config.js";
import {listarProductoByID} from '../controllers/productosControllers.js'


const routerPrecios = Router()

routerPrecios.get('/:id', listarProductoByID)

export default routerPrecios