import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket.model';

import 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { Summary } from 'src/app/dashboard/summary.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  summaryActivated = new Subject();

  ticketChanged = new Subject();

  summary:Summary;

  constructor(private apiService:ApiService) { }

  
  getTickets(pageIndex:number,pageSize:number){
    return this.apiService.get("ticket/?pageIndex=" + pageIndex + "&pageSize=" + pageSize)
    .pipe(map((data:any)=>
    {
      return data as Ticket[];

    }));
  }


  getUserTicket(id:number){
    return this.apiService.get('userticket/' + id)
    .pipe(map((data:any)=>{
      
      return data as Ticket[];
    
    }));
  }

  getUserTicket2(UserId:number,pageIndex:number,pageSize:number)
  {
       return this.apiService.get("user/tickets/pagi?pageIndex=" + pageIndex  
       + "&pageSize=" + pageSize + "&userId=" + UserId)
       .pipe(map((data:any) => {

        return data as Ticket[];

      }));
  }

  //get ticket by client id to chat 
  getTicketByClientId(id:number){

    return this.apiService.get("user/ticket/client?id=" + id)
    .pipe(map((data:any)=>{

        return data as Ticket[];

    }));
  }

  addTicket(ticket:Ticket){

    return this.apiService.post("ticket",ticket).pipe(map((data => data.json())
    )
    );

    //verify if this is necesary to update the list
    //this.ticketsListChanged.next(this.tickets.slice());
  }


  updateTicket(ticket:Ticket){
    return this.apiService.put("ticket",ticket)
    
    .pipe(map((res => res.json())
    
    ));
  }

  getTicket(id:number){
    return this.apiService.get('ticket/' + id)
    .pipe(map((data:any)=>{
      
      return data as Ticket[]
   
    }));
    
    
  }

}
