import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-tickets',
  templateUrl: './manage-tickets.component.html',
  styleUrls: ['./manage-tickets.component.css']
})
export class ManageTicketsComponent implements OnInit {

  ticketType ="admin";

  constructor() { }

  ngOnInit() {
  }

}
