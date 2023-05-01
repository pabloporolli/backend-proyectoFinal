import * as model from '../models/users.js'
import bcrypt from 'bcrypt'
import { usuarioActual } from '../router/routerAuth.js'
import logger from '../config/loggers.js'



async function generateHashPassword(password) {
    const hashPassword = await bcrypt.hash(password, 10)
    return hashPassword
}


const autorizarUsuario = (req, res) =>{

    const nombre = req.session.passport.user.username
    const email = req.session.passport.user.email
    res.render('home',  {nombre: nombre, email: email})
}

const desloggearUsuario = (req, res) => {
    let nombre = req.session.passport.user.username
    res.render('logout', {nombre: req.session.passport.user.username})
    req.session.destroy(err=>{
        if(err){
            logger.error('Error al deslogguearse')
            res.json({status: 'Error al deslogguearse', body: err})

        }
    })
}

const solicitarLogin = (req, res) => {
    res.render('login')
}

const loginError = (req, res) => {
    res.render('login-error');
}

const registro = (req, res) => {
    res.render('register')
}

const registrarUsuario = async (req,res) =>{
    let{ username, email, password, direccion, edad, telefono, foto } = req.body
    const newUser = {
        username: username,
        email: email,
        password: await generateHashPassword(password),
        direccion: direccion,
        edad: edad,
        telefono: telefono,
        foto: foto
    }
    saveUser(newUser)
    .then((res)=>{
        console.log(res)
    })
    res.redirect('/login');
}
// Función para guardar el usuario
async function saveUser(user) {
    user = {
        ...user,
        admin: false
    }
    const userSave = await model.usuarios.insertMany(user)
    return userSave
}

let datosPersonales
const obtenerDatosPersonales = async (req, res) => {
    console.log(usuarioActual);
    if (!usuarioActual){
        res.redirect('/login')
    }
    else {
        datosPersonales = await model.usuarios.findOne({email: usuarioActual.email})
        res.json(datosPersonales)
    }
}


export {
    autorizarUsuario,
    desloggearUsuario,
    solicitarLogin,
    loginError,
    registro,
    registrarUsuario,
    obtenerDatosPersonales
}
