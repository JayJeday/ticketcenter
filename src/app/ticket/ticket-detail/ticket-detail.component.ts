import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/core/models/ticket.model';
import { TicketService } from 'src/app/core/services/ticket.service';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  ticket:Ticket;
  id:number;
  loading = false;

  //which components the data will operate on
  comp:string;


  constructor(private route: ActivatedRoute,private router: Router,  private ticketService:TicketService) { }

  ngOnInit() {

    //get the  route parameter
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
         this.ticketService.getTicket(this.id);
      }
    );

    this.route.data
    .subscribe((data)=>{
      this.comp = data['comp'];
      
    });

  }

  onEditTicket(form:NgForm){
    this.loading = true;

    this.ticket = new Ticket();
    this.ticket.TicketId = this.ticketService.ticket.TicketId;
    
    //if comment is null get the one from service
    this.ticket.Comment = form.value.Comment;
    
    console.log(form.value.StatusId);

    this.ticket.StatusId = form.value.StatusId;

    //get the ticket user id from the service
     this.ticket.UserId = this.ticketService.ticket.UserId;

    console.log(JSON.stringify(this.ticket));

    //pass back the same ticket
    this.ticketService.updateTicket(this.ticket)
     .subscribe(data => {
        this.loading = false;
        //notification of succesfully saved
       //need to update list so it refresh it 
     });

    this.loading = false;


  }
}
