const socket = io.connect();



/// CHAT

const email = document.getElementById('username')
const message = document.getElementById('inputMensaje')
const botonEnviar = document.getElementById('btnEnviar')

const agregarMensaje = document.getElementById('formPublicarMensaje')
agregarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    // const email = document.getElementById('username').value
    // const message = document.getElementById('inputMensaje').value

    const nuevoMensaje = {
        email: email.value,
        text: message.value
    }

    socket.emit('nuevoMensaje', nuevoMensaje)
    
    agregarMensaje.reset()
    message.focus()

})

function renderMensajes(data) {
    console.log("DATA: ", data);
    const listaMensajes = data.map(item => {
        return (`
            <div>
                <ul class="list-group">
                    <li class="list-group-item" id="lista">
                    <strong style="color: blue">${item.email}</strong> <span style="color: brown">[${(new Date()).toLocaleString()}]: </span> <em style="color: green">${item.text}</em>
                    </li>
                </ul>
            </div>
            `)
        }).join('')
        
        document.getElementById('mensajes').innerHTML = listaMensajes
    }
    
socket.on('mensajes', data => {
        renderMensajes(data)
})

email.addEventListener('input', () => {
    const hayEmail = email.value.length
    const hayTexto = message.value.length
    message.disabled = !hayEmail
    botonEnviar.disabled = !hayEmail || !hayTexto
})

message.addEventListener('input', () => {
    const hayTexto = message.value.length
    botonEnviar.disabled = !hayTexto
})


