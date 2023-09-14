const socket = io();

const botonChat = document.getElementById('botonChat');
const parrafosMensajes = document.getElementById('parrafosMensajes');
const valInput = document.getElementById('chatBox');

let user;

Swal.fire({
    title: 'Info de usuario',
    text: 'Ingresa tu nombre',
    input: 'text',
    inputValidator: (value) => {
        return !value && 'Ingrese un nombre valido'
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then((result) => {
    user = result.value;
    console.log(`!Hola ${user}!`);
});

const ActualizarMensajes = () => {
    let fechaActual = new Date().toLocaleString();
    console.log(fechaActual);
    if(valInput.value.trim().length>0){
        const mensaje = valInput.value;
        socket.emit('mensaje', { fecha: fechaActual, user: user,  mensaje:mensaje});
        valInput.value = ''; //Limpio el input
    }
}

botonChat.addEventListener('click', ()=>{ActualizarMensajes()});
valInput.addEventListener('keyup', ({key})=>{key==="Enter" ? ActualizarMensajes() : null});

socket.on('mensajes', arrayMensajes => {
    parrafosMensajes.innerHTML = "";
    arrayMensajes.forEach(mensaje => {
        parrafosMensajes.innerHTML += `<p>${mensaje.fecha}: ${mensaje.user} ${mensaje.mensaje}</p>`
    }
    )
});
