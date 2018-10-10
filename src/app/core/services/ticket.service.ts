import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor() { }

  addTicket(ticket:Ticket){
    console.log("tickets added");
  }
}
