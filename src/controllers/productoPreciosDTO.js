import { convertirPrecio } from "../utils/convertirMoneda.js";

let precio;
const traerProducto  = (prod) =>{
    precio = prod[0].price
    prod.precioEnPesos = convertirPrecio(precio)

}


export default traerProducto