import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from 'src/app/core/models/ticket.model';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css']
})
export class TicketItemComponent implements OnInit {

  @Input() ticket:Ticket;
  @Input() index:number;

  constructor() { }

  ngOnInit() {
  }

}
