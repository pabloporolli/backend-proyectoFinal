import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js"

class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('productos', {
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            id: {type: Number}
        })
    }
}

export default ProductosDaoMongoDb