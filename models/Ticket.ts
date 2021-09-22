export default class Ticket {
    number: number;
    desk: number | null;
    
    constructor(number: number, desk: number | null) {
        this.number = number;
        this.desk = desk;
    }
}