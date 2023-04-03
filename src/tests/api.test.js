import { expect } from 'chai'
import supertest from 'supertest'
import app from '../../server.js'

let request
let server
let id
const nuevoProducto = {
    title: "Producto Prueba",
    price: 5000,
    thumbnail: "../../uploads/1668948120923_madonesl7.png"
}

describe('Test API', () => {

    before(async function () {
        server = await startServer()
        request = supertest(`http://localhost:${server.address().port}/productos`)
    })

    after(function () {
        server.close()
    })

    describe('Lectura de productos', () => {
        it('Debería retornar un status 200', async () => {
            const response = await request.get('/')
            expect(response.status).to.eql(200)
        })

        it('Debería retornar un array', async () => {
            const response = await request.get('/')
            const products = response.body
            expect(products.respuesta).to.be.an('array')
        })
    })


    describe('Petición POST', () => {
        it('Debería retorrnar un status 200 ', async () => {
            const response = await request.post('/').send(nuevoProducto)
            expect(response.status).to.eql(200)

        })

        it('Debería retornar un id', async () => {
            const prodIniciales = await request.get('/')
            const cantidadInicialProductos = prodIniciales.body.respuesta.length
            
            const response = await request.post('/').send(nuevoProducto)
            expect(response.body.respuesta).to.be.a('number')
        })
    })
})

async function startServer() {
    return new Promise((resolve, reject) => {
        const PORT = 8081
        const server = app.listen(PORT, () => {
            console.log(`Servidor express escuchando en el puerto ${server.address().port}`);
            resolve(server)
        });
        server.on('error', error => {
            console.log(`Error en Servidor: ${error}`)
            reject(error)
        });
    })
}