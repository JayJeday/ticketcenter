import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TicketService } from 'src/app/core/services/ticket.service';


@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianComponent implements OnInit {

  //routeId
  id:number;
  userTickets = 'byUser';
  constructor(private route: ActivatedRoute,private router: Router,  private ticketService:TicketService) { }

  ngOnInit() {
    //get route pass id when user login
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
         this.ticketService.getUserTicket(this.id);
      }
    );


  }

}
