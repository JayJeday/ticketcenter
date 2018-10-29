import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';

import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { Summary } from 'src/app/dashboard/summary.model';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  summaryActivated = new Subject();

  ticketChanged = new Subject();

  summary:Summary;
  totalTicket = 0;
  openTicket = 0;
  closeTicket = 0;
  cellphoneTicket = 0;
  computerTicket = 0;

  ticketList:Ticket[];
  ticket:Ticket;

  constructor(private http:Http) { }

  //get all tickets
  /*
getTickets(pageIndex:number,pageSize:number){
    this.http.get("http://localhost:2175/api/ticket/?pageIndex=" + pageIndex + "&pageSize=" + pageSize)
    .map(
      (data : Response) =>{  return data.json() as Ticket[]; })
    .toPromise().then(x => {
      this.ticketList = x;
    }).catch((x)=>'error was called');
  }


  */
  getTickets(pageIndex:number,pageSize:number){
    return this.http.get("http://localhost:2175/api/ticket/?pageIndex=" + pageIndex + "&pageSize=" + pageSize)
    .map(
      (data : Response) =>{  return data.json() as Ticket[]; });
  }

  getUserTicket(id:number){
    this.http.get('http://localhost:2175/api/userticket/' + id)
    .map(
      (data : Response) =>{  return data.json() as Ticket[] })
    .toPromise().then(x => {
      this.ticketList = x;
    }).catch((x)=>'error was called');
  }

  getUserTicket2(UserId:number,pageIndex:number,pageSize:number)
  {
       return this.http.get("http://localhost:2175/api/user/tickets/pagi?pageIndex=" + pageIndex  + "&pageSize=" + pageSize + "&userId=" + UserId)
       .map(
        (data : Response) =>{  return data.json() as Ticket[] });
  }




  addTicket(ticket:Ticket){
    var body = JSON.stringify(ticket);
    console.log(body);
    var headerOptions = new Headers({'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http.post('http://localhost:2175/api/ticket',body,requestOptions).map(x => x.json());

    //verify if this is necesary to update the list
    //this.ticketsListChanged.next(this.tickets.slice());
  }

  updateTicket(ticket:Ticket){
    var body = JSON.stringify(ticket);
    console.log(body);
    var headerOptions = new Headers({ 'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put("http://localhost:2175/api/ticket",
      body,
      requestOptions).map(res => res.json());
  }

  getTicket(id:number){
    this.http.get('http://localhost:2175/api/ticket/' + id)
    .map(
      (data : Response) =>{  return data.json() as Ticket[] })
    .toPromise().then(x => {
      this.ticket = x[0];
    }).catch((x)=>'error was called');
  }

}
