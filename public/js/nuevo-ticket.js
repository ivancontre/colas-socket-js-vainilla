const socket = io();

const label = document.querySelector('#lblNuevoTicket');
const button = document.querySelector('button');

socket.on('connect', () => {
    console.log('conectado');
    button.disabled = false;
});

socket.on('disconnect', () => {
    console.log('desconectado');
    button.disabled = true;
});

button.addEventListener('click', () => {
    socket.emit('next-ticket', null, (ticket) => {
        label.innerText = `Ticket ${ticket}`;
    });
});

socket.on('last-ticket', (ticket) => {
    label.innerText = `Ticket ${ticket}`;
});