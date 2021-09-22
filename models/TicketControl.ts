import path from 'path';
import fs from 'fs';
import Ticket from './Ticket';

export default class TicketControl {
    last: number;
    today: number;
    pendingTickets: Ticket[];
    last4Tickets: Ticket[]

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.pendingTickets = [];
        this.last4Tickets = [];
        this.init();
    }

    get toJson() {

        return {
            last: this.last,
            today: this.today,
            pendingTickets: this.pendingTickets,
            last4Tickets: this.last4Tickets
        }

    }

    init() {

        const { last, today, pendingTickets, last4Tickets } = require('../db/data.json');        

        if (today === this.today) {
            this.last = last;            
            this.pendingTickets = pendingTickets;
            this.last4Tickets = last4Tickets;
        } else { // Otro día
            this.saveInDB();
        }

    }

    saveInDB() {

        const pathDB = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(pathDB, JSON.stringify(this.toJson, null, 3));

    }

    next() {

        this.last += 1;
        const ticket: Ticket = new Ticket(this.last, null);
        this.pendingTickets.push(ticket);

        this.saveInDB();

        return ticket.number;

    }

    attendTicker(desk: number) {

        if (this.pendingTickets.length === 0) {
            return null;
        }

        const ticket: Ticket = this.pendingTickets.shift() as Ticket; //this.pendingTickets[0];
        
        ticket.desk = desk;

        this.last4Tickets.unshift(ticket);

        if (this.last4Tickets.length > 4) {
            this.last4Tickets.splice(-1, 1);
        }

        this.saveInDB();

        return ticket;

    }


}