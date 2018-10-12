import { Component, OnInit } from '@angular/core';
import {Ticket} from  '../../core/models/ticket.model';
import { Router, ActivatedRoute } from '@angular/router';
import {TicketService} from '../../core/services/ticket.service'
import { Subscription } from 'rxjs/Subscription';
import { CategoriesService } from 'src/app/core/services/categories.service';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {


  constructor(private ticketService:TicketService,
     private router: Router,
     private route: ActivatedRoute) { }

     
  ngOnInit() {
    this.ticketService.getTickets();
    console.log(this.ticketService.ticketList);
  }

}
