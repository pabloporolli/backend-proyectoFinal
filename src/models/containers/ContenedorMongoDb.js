import mongoose from 'mongoose'
import pkg from 'mongoose';
const { model } = pkg;
import config from '../../config/config.js'
import CustomError from '../../clases/CustomError.class.js';
import MongoDBClient from '../../clases/MongoDBClient.class.js';
import logger from '../../config/loggers.js';

// await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class ContenedorMongoDb {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
        this.conn = new MongoDBClient()
    }

    async getById(id) {
        try {
            await this.conn.connect()            
            const leerUno = await this.coleccion.find({id: id})
            console.log(leerUno);
            return leerUno
        } catch (error) {
            const cuserr = new CustomError(500, 'Error con el médoto getByID', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            this.conn.disconnect();
        }
    }

    async getAll() {
        try {
            await this.conn.connect()
            const leerTodo = await this.coleccion.find()
            console.log(leerTodo);
            return leerTodo            
        } catch (error) {
            const cuserr = new CustomError(500, 'Error con el método getAll', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            this.conn.disconnect()
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
            console.log('Elemento guardado', elementoSaved);
            return id
        } catch (error) {
            const cuserr = new CustomError(500, 'Error con el método save', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            this.conn.disconnect()
        }
    }

    async modifyById(pos, nuevoElem) {
        try {
            await this.conn.connect()
            const elemUpdate = await this.coleccion.updateOne({id: pos}, {$set: nuevoElem})
        } catch (error) {
            const cuserr = new CustomError(500, 'Error con el método modifyById', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            this.conn.disconnect()
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
        } finally {
            this.conn.disconnect()
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
        } finally {
            this.conn.disconnect()
        }
    }

    async modifyCarritoById (pos, nuevoElem) {
        try {
            await this.conn.connect()
            console.log(nuevoElem);
            const elemUpdate = await this.coleccion.updateOne({id: pos}, {$addToSet: {productos: nuevoElem}})
        } catch (error) {
            const cuserr = new CustomError(500, 'Error con el método modifyCarritoByID', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            this.conn.disconnect()
        }
    }

}

export default ContenedorMongoDb