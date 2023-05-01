import ContenedorArchivo from "../../containers/ContenedorArchivo.js"

class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('src/DB/baseCarritos.json')
    }

}

export default CarritosDaoArchivo
