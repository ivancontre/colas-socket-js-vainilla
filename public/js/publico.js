
const socket = io();

const labelTicket1 = document.querySelector('#lblTicket1')
const labelDesk1 = document.querySelector('#lblEscritorio1')

const labelTicket2 = document.querySelector('#lblTicket2')
const labelDesk2 = document.querySelector('#lblEscritorio2')

const labelTicket3 = document.querySelector('#lblTicket3')
const labelDesk3 = document.querySelector('#lblEscritorio3')

const labelTicket4 = document.querySelector('#lblTicket4')
const labelDesk4 = document.querySelector('#lblEscritorio4')


socket.on('current-status', (data) => {

    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play()

    const [ticket1, ticket2, ticket3, ticket4] = data;

    labelTicket1.innerText = ticket1 ? 'Ticket ' + ticket1.number : 'Sin ticket';
    labelDesk1.innerText  =  ticket1 ? ticket1.desk: 'Sin escritorio';
    labelTicket2.innerText  = ticket2 ? 'Ticket ' + ticket2.number : 'Sin ticket';
    labelDesk2.innerText  = ticket2 ? ticket2.desk: 'Sin escritorio';
    labelTicket3.innerText  =  ticket3 ? 'Ticket ' + ticket3.number : 'Sin ticket';
    labelDesk3.innerText  = ticket3 ? ticket3.desk: 'Sin escritorio';
    labelTicket4.innerText  =  ticket4 ? 'Ticket ' + ticket4.number : 'Sin ticket';
    labelDesk4.innerText  = ticket4 ? ticket4.desk: 'Sin escritorio';

});