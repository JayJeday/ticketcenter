import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/core/models/ticket.model';
import { TicketService } from 'src/app/core/services/ticket.service';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StatusService } from 'src/app/core/services/status.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  ticket:Ticket;
  id:number;
  loading = false;
  selected:number;

  //which components the data will operate on
  comp:string;


  constructor(private route: ActivatedRoute,
    private router: Router,  
    private ticketService:TicketService,
    private statusService:StatusService,
    public snackBar: MatSnackBar
    ) { }

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

    this.statusService.getStatus();


  }

  onEditTicket(form:NgForm){
    this.loading = true;

    this.ticket = new Ticket();
    this.ticket.TicketId = this.ticketService.ticket.TicketId;
    
    //if comment is null get the one from service
    this.ticket.Comment = form.value.Comment;
    

    this.ticket.StatusId = form.value.StatusId;

    //get the ticket user id from the service
     this.ticket.UserId = this.ticketService.ticket.UserId;

    console.log(JSON.stringify(this.ticket));

    //pass back the same ticket
    this.ticketService.updateTicket(this.ticket)
     .subscribe(data => {
        this.loading = false;

       this.snackBar.open("Ticket Updated successfully",'', {
        duration: 1000
      });

       //need to update list so it refresh it 
       //TODO need to have the id  of the current user from local storage
       if(this.comp ==="tech"){
         //update tech list
        // this.ticketService.getUserTicket(this.id);
       }
       
     },
     error=>{
      this.snackBar.open("Error ocurred");
     });

    this.loading = false;


  }
}
