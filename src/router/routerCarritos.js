import { Router } from "express";
const routerCarritos = Router()

import {
    verCarritos,
    agregarAlCarrito,
    verUnCarrito,
    borrarCarritoById,
    borrarItemDelCarrito,
    agregarProdAlCarrito,
    finalizarCompra
} from '../controllers/carritosControllers.js'


//-----RUTAS-------
routerCarritos.get('/', verCarritos)

routerCarritos.get('/:id', verUnCarrito)

routerCarritos.post('/', agregarAlCarrito)

routerCarritos.post('/:id/:id_prod', agregarProdAlCarrito)

routerCarritos.delete('/:id', borrarCarritoById)

routerCarritos.delete('/:id/:id_prod', borrarItemDelCarrito)

routerCarritos.get('/:id/finalizar-compra', finalizarCompra)

export default routerCarritos

