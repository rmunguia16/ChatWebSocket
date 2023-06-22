// Objetivo: Archivo para el cliente del chat

const socket = io();

/* Swal.fire({
    title: 'Bienvenido a la sala de chat',
    text: 'Mensaje inicial',
    icon: 'success'
}); */

let user;
const chatbox = document.getElementById('chatbox');

Swal.fire({
    title: 'Identifiquese',
    input: 'text',
    text: 'Ingrese su nombre de usuario para ingresar en el chat',
    inputValidator: (value) => {
        return !value && 'Debe ingresar un nombre de usuario'
    },
    allowOutsideClick: false,
    allowEscapeKey: false,

}).then((result) => {
    user = result.value;
    socket.emit('authenticated', user );
});

chatbox.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (chatbox.value.trim().length > 0) {
            socket.emit('message', { user, message: chatbox.value });
            chatbox.value = '';
        }
    }
});

socket.on('messageLogs', (data) => {
    let log = document.getElementById('messageLogs');
    let messages = '';
    data.forEach (message => {
        messages +=`${message.user}: ${message.message}<br>`;
    });
    log.innerHTML = messages;
});

socket.on('newUserConnected', (data) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmationButton: false,
        timer: 3000,
        title:`${data} se unió al chat`
    });
});