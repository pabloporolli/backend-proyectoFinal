//----------MODULOS----------------//
import express from "express";
import session from 'express-session'
import config from "./src/config/config.js";
import cluster from 'cluster'
import os from 'os'
import compression from 'compression';
import mongoose from "mongoose";
import { fork } from 'child_process'
import parseArgs from 'minimist'
import routerAuth from './src/router/routerAuth.js'
import routerProductos from './src/router/routerProductos.js'
import routerCarritos from './src/router/routerCarritos.js'
import routerPrecios from "./src/router/routerPrecios.js";
import ejs from 'ejs'

// import GraphQLController from "./src/controllers/graphQLController.js";

const app = express();

//------------MOTOR DE PLANTILLAS Y MIDDLEWARES----------//
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('views', './views/pages')
app.set('view engine', 'ejs');

app.use(compression())

app.use(session(config.session))


//-----------Mongo DB--------------//
// export const conectarDB = () => {
// } 
mongoose.set('strictQuery', false)
const URL = 'mongodb+srv://pablo:HdQjESbohlGU3CHy@cluster0.t07wrvg.mongodb.net/test'
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



//-----------Configuración del Socket----------//
import { Server as HttpServer } from 'http'
import { Server as IOSocket } from 'socket.io'
const httpServer = new HttpServer(app)
const io = new IOSocket(httpServer)

import ContenedorDBChat from './src/controllers/chatController.js'
import { log } from "console";
import ContenedorArchivo from "./src/models/containers/ContenedorArchivo.js";

const mensajes = new ContenedorArchivo ("./src/DB/chatMensajes.json")

io.on('connection', socket => {
    console.log('Nuevo cliente conectado');
    
    socket.on('nuevoMensaje', data => {
        mensajes.save(data)
        .then(() => {
            mensajes.getAll()
            .then((res) => {
                socket.emit('mensajes', res)
            })
        })
    })

    mensajes.getAll()
        .then((res) => {
            socket.emit('mensajes', res)
        })

})



//------------RUTAS----------------//
app.use('/', routerAuth)

app.use('/productos', routerProductos)

app.use('/carrito', routerCarritos)

app.use('/productos-precios', routerPrecios)

// app.use('/graphql', new GraphQLController());


//-----------SERVIDOR---------------//
const CPU_CORES = os.cpus().length
if (config.mode == 'CLUSTER' && cluster.isPrimary) {
    console.log('Cantidade de cores: ', CPU_CORES)
    
    for (let i = 0; i < CPU_CORES; i++) {
        cluster.fork()
    }
    
    cluster.on('exit', worker => {
        console.log(`Worker finalizó proceso ${process.pid} ${worker.id} ${worker.pid} finalizó el ${new Date().toLocaleString}`)
        cluster.fork()
    })
} else {
    const servidor = httpServer.listen(config.PORT, err => {
        if (!err) console.log(`Servidor http escuchando en el puerto ${config.PORT} - PID: ${process.pid}`)
    })

    servidor.on('error', error => console.log(`Error en servidor: ${error}`))
}

export default app