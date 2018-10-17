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
  getTickets(){
    this.http.get('http://localhost:2175/api/ticket/')
    .map(
      (data : Response) =>{  return data.json() as Ticket[]; })
    .toPromise().then(x => {
      this.ticketList = x;
    }).catch((x)=>'error was called');
  }

  getUserTicket(id:number){
    console.log(id);
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


  onSummaryCall(){
    this.http.get('http://localhost:2175/api/ticket/')
    .map(
      (data : Response) =>{  return data.json() as Ticket[]; })
    .toPromise().then(x => {
      this.ticketSummary(x);
    }).catch((x)=>'error was called');
  }
  
//get summary of all tickets
  ticketSummary(tickets:Ticket[]){

    //TODO store procedure do this better
    this.summary = new Summary();
    this.summary.numTicketsTotal = tickets.length;
     //get the ticket lenght
         tickets.forEach(ticket =>{
         if(ticket.StatusDesc === "open"){
           this.openTicket++;
         }
         if(ticket.StatusDesc === "close"){
           this.closeTicket++;
         }
         if(ticket.CategoryDesc === "computers"){
           this.computerTicket++;
         }
         if(ticket.CategoryDesc === "cell phones"){
           this.cellphoneTicket++;
         }
       });
       this.summary.numTicketsOpen = this.openTicket;
       this.summary.numTicketsClose = this.closeTicket;
       this.summary.cellphonesTickets = this.cellphoneTicket;
       this.summary.computerTickets = this.computerTicket;

       //clear values
        this.totalTicket = 0;
        this.openTicket = 0;
        this.closeTicket = 0;
        this.cellphoneTicket = 0;
        this.computerTicket = 0;
       return this.summary;


       console.log(this.summary);
   }
}
