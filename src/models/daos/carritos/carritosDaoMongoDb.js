import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js"

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('carritos', {
            productos: { type: [], required: true },
            id: {type: Number},
            cart_timestamp: {type: Number}
        })
    }

    async guardar(nuevoElem) {
        const data = await this.coleccion.find()
        let id = 0
        data.length === 0 ? id = 1 : id = data.length + 1
        const elementoSaved = await this.coleccion.insertMany({
            id: id,
            productos: nuevoElem
        })
        console.log('Elemento guardado', id);
        return id
    }

}

export default CarritosDaoMongoDb
