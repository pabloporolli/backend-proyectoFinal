import mongoose from 'mongoose'
import pkg from 'mongoose';
const { model } = pkg;
import CustomError from '../../clases/CustomError.class.js';
import MongoDBClient from '../../clases/MongoDBClient.class.js';
import logger from '../../config/loggers.js';


class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
        this.conn = new MongoDBClient()
    }

    async getById(id) {
        try {
            await this.conn.connect()            
            const leerUno = await this.coleccion.find({id: id})
            return leerUno
        } catch (error) {
            const cuserr = new CustomError(500, 'Error con el médoto getByID', error);
            logger.error(cuserr);
            throw cuserr;
        }
    }

    async getAll() {
        try {
            await this.conn.connect()
            const leerTodo = await this.coleccion.find()
            return leerTodo            
        } catch (error) {
            const cuserr = new CustomError(500, 'Error con el método getAll', error);
            logger.error(cuserr);
            throw cuserr;
        }
    }

    async save(nuevoElem) {
        try {
            await this.conn.connect()
            const data = await this.coleccion.find()
            let id = 0
            data.length === 0 ? id = 1 : id = data.length + 1
            nuevoElem.id = id;
            const elementoSaved = await this.coleccion.insertMany({
                ...nuevoElem
            })            
            return nuevoElem
        } catch (error) {
            const cuserr = new CustomError(500, 'Error con el método save', error);
            logger.error(cuserr);
            throw cuserr;
        }
    }

    async modifyById(pos, nuevoElem) {
        try {
            await this.conn.connect()
            const elemUpdate = await this.coleccion.updateOne({id: pos}, {$set: nuevoElem})
            return elemUpdate
        } catch (error) {
            const cuserr = new CustomError(500, 'Error con el método modifyById', error);
            logger.error(cuserr);
            throw cuserr;
        }
    }

    async deleteById(id) {
        try {
            await this.conn.connect()
            const prodABorrar = await this.coleccion.find({id: id})
            const del = await this.coleccion.deleteOne({id: id})
            return prodABorrar
        } catch (error) {
            const cuserr = new CustomError(500, 'Error con el método deleteById', error);
            logger.error(cuserr);
            throw cuserr;
        }
    }

    async deleteAll() {
        try {
            await this.conn.connect()
            const delAll = await this.coleccion.deleteAll()
        } catch (error) {
            const cuserr = new CustomError(500, 'Error con el método deleteAll', error);
            logger.error(cuserr);
            throw cuserr;
        }
    }

    async modifyCarritoById (pos, nuevoElem) {
        try {
            await this.conn.connect()
            const elemUpdate = await this.coleccion.updateOne({id: pos}, {$addToSet: {productos: nuevoElem}})
        } catch (error) {
            const cuserr = new CustomError(500, 'Error con el método modifyCarritoByID', error);
            logger.error(cuserr);
            throw cuserr;
        }
    }

}

export default ContenedorMongoDb