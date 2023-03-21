import session from 'express-session'
import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import config from "../config/config.js";
import * as model from '../models/users.js'
import {autorizarUsuario,
        desloggearUsuario,
        solicitarLogin,
        loginError,
        registro,
        registrarUsuario,
        obtenerDatosPersonales} from '../controllers/authController.js'


const routerAuth = Router()
routerAuth.use(session(config.session))



routerAuth.use(passport.initialize())
routerAuth.use(passport.session())


const LocalStrategy = Strategy;

import bcrypt from 'bcrypt'

// Passport-local
let usuarioActual
passport.use(new LocalStrategy(
    async function(email, password, done){
        console.log(`El usuario enviado es ${email} ${password}`)
        // Existe usuario devuelve el objeto del usuario (con ObjectId de Mongo)
        const existeUsuario = await model.usuarios.findOne({email: email})
        usuarioActual = existeUsuario
        console.log('Existe usuario: ' + existeUsuario)

        if(!existeUsuario){
            console.log('usuario no encontrado')
            return done(null, false)
        }
        else{
            const match = await verifyPass(existeUsuario, password)
            if (!match) {
                return done(null, false)
            }
            return done(null, existeUsuario);
        }
    }
))

passport.serializeUser((usuario, done) => {
    done(null, usuario);
});

passport.deserializeUser((nombre, done) => {
    model.usuarios.find({username: nombre})
    .then((res=>{
        done(null, res)
    }))
    .catch((err) =>{console.log('error desde deserializacion' + err)})
});


// Metodos de Auth con Bcrypt
async function generateHashPassword(password) {
    const hashPassword = await bcrypt.hash(password, 10)
    return hashPassword
}

async function verifyPass(usuario, password) {
    const match = await bcrypt.compare(password, usuario.password)
    console.log(`pass login: ${password} || pass hash: ${usuario.password}`)
    console.log(match)
    return match
}

function isAuth(req, res, next){
    if(req.isAuthenticated()){
        next()
    }
    else{
        res.redirect('/login')
    }
}

//------------ROUTES----------------//

routerAuth.get('/', isAuth, autorizarUsuario)

routerAuth.get('/login', solicitarLogin)

routerAuth.get('/logout', desloggearUsuario)

routerAuth.get('/login-error', loginError)

routerAuth.get('/register', registro)

routerAuth.post('/register', registrarUsuario)

routerAuth.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect: '/login-error'}),
(req, res) => {
})

routerAuth.get('/datos-personales', obtenerDatosPersonales)



//------EXPORT----------//

export default routerAuth

export {usuarioActual}
