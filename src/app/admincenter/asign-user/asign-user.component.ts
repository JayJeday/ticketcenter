import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from 'src/app/core/models/ticket.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-asign-user',
  templateUrl: './asign-user.component.html',
  styleUrls: ['./asign-user.component.css']
})
export class AsignUserComponent implements OnInit {

  @Input() ticket:Ticket;
  searchInput:string;


  constructor() { }

  ngOnInit() {
    console.log(this.ticket);
  }

}
