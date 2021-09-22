import * as socketIO from 'socket.io';
import TicketControl from '../models/TicketControl';

const ticketControl = new TicketControl();

export const socketController = (socket: socketIO.Socket) => {

    console.log('client connected', socket.id);
    socket.emit('last-ticket', ticketControl.last);
    socket.emit('current-status', ticketControl.last4Tickets);
    socket.emit('pending-tickets', ticketControl.pendingTickets.length);

    socket.on('disconnect', () => {
        console.log('client disconnected', socket.id);
    });

    // Escucha mensajes desde el cliente
    socket.on('next-ticket', (payload, callback) => {
        //console.log('mensaje recibido desde el cliente:', payload);

        const next = ticketControl.next();

        socket.broadcast.emit('pending-tickets', ticketControl.pendingTickets.length);

        callback(next);

        // TODO: Notificar que hay un nuevo ticker pendiente de asignar

        // Envía el mensaje a TODOS los clientes
        // socket.broadcast.emit('message-from-server', payload);
    });

    socket.on('attend-ticket', (payload, callback) => {
        const { desk } = payload;

        if (!desk) {
            return callback({
                ok: false,
                msg: 'El campo "desk" es obligatorio'
            })
        }

        const ticket = ticketControl.attendTicker(desk);

        socket.broadcast.emit('current-status', ticketControl.last4Tickets);
        socket.emit('pending-tickets', ticketControl.pendingTickets.length);
        socket.broadcast.emit('pending-tickets', ticketControl.pendingTickets.length);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    })
    

};