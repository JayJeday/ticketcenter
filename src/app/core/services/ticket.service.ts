import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';

import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  ticketsListChanged = new Subject<Ticket[]>();

  ticketList:Ticket[];

  constructor(private http:Http) { }

  //get all tickets
  getTickets(){
    this.http.get('http://localhost:2175/api/ticket/getalltickets')
    .map(
      (data : Response) =>{  return data.json() as Ticket[]; })
    .toPromise().then(x => {
      this.ticketList = x;
    }).catch((x)=>'error was called');
  }



  addTicket(ticket:Ticket){
    var body = JSON.stringify(ticket);
    console.log(body);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:2175/api/ticket/addticket',body,requestOptions).map(x => x.json());

    //verify if this is necesary to update the list
    //this.ticketsListChanged.next(this.tickets.slice());
  }

  updateTicket(ticket:Ticket){
    var body = JSON.stringify(ticket);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put("http://localhost:2175/api/ticket/updateticket",
      body,
      requestOptions).map(res => res.json());
  }

}
