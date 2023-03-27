import { convertirPrecio } from "../utils/convertirMoneda.js";

let precio;
const traerProducto  = (prod) =>{
    console.log(prod[0].price);
    precio = prod[0].price
    prod.precioEnPesos = convertirPrecio(precio)
    console.log("EL DTO ES: ", prod);

}


export default traerProducto