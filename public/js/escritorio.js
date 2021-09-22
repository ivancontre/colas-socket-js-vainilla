
const socket = io();

const labelDesk = document.querySelector('h1');
const smallTicket = document.querySelector('small');
const button = document.querySelector('button');
const divAlert = document.querySelector('.alert');
const labelPending = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('El parámetro "desk" es obligatorio');
}

const desk = searchParams.get('desk');
labelDesk.innerText = desk;

divAlert.style.display = 'none'

socket.on('connect', () => {
    console.log('conectado');
    button.disabled = false;
});

socket.on('disconnect', () => {
    console.log('desconectado');
    button.disabled = true;
});

button.addEventListener('click', () => {
    socket.emit('attend-ticket', { desk }, (data) => {

        if (!data.ok) {
            smallTicket.innerText = 'Nadie';
            return divAlert.style.display = '';
        }

        smallTicket.innerText = `Ticket ${data.ticket.number}`;
        
    });
});

socket.on('pending-tickets', (numberPendingTickets) => {
    console.log('numberPendingTickets', numberPendingTickets)

    if (numberPendingTickets) {

        labelPending.innerText = numberPendingTickets;
        button.disabled = false;
        divAlert.style.display = 'none';   
    
    } else {
        
        labelPending.innerText = '';
        button.disabled = true;
        divAlert.style.display = ''; 
    }
    
});