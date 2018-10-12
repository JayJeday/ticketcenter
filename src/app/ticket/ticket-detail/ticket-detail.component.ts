import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/core/models/ticket.model';
import { TicketService } from 'src/app/core/services/ticket.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  ticket:Ticket;
  id:number;
  editTicketForm:FormGroup;
  loading = false;
  


  constructor(private route: ActivatedRoute,private router: Router,  private ticketService:TicketService, private fb:FormBuilder) { }

  ngOnInit() {

    //get the  route parameter
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        console.log(this.id);
      }
    );

    this.editTicketForm = this.fb.group({
      comments:'',
      status:''
    });

  }

  onEditTicket(){
    this.loading = true;

    this.ticketService.updateTicket(this.editTicketForm.value)
    .subscribe(data => {
      this.loading  = false;
      //notify that was successfully close
    });

    
    this.loading = false;


  }
}
