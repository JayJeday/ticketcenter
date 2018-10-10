import { Component, OnInit } from '@angular/core';
import {Ticket} from  '../../core/models/ticket.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  tickets:Ticket[] = [
    {
      id:1,
      description: 'Computer test',
      comment:'pending check',
      createdDate: '10-10-2018',
      categoryId:1,
       statusId:1
    },
   
    {
      id:2,
      description: 'Cell phone test',
      comment:'pending test 2',
      createdDate: '07-10-2018',
      categoryId:2,
       statusId:2
    },

    {
      id:3,
      description: 'Tv test',
      comment:'Is working properly',
      createdDate: '2-10-2018',
      categoryId:2,
       statusId:3
    },
    {
      id:4,
      description: 'tv wreck',
      comment:'un-fixable',
      createdDate: '11-22-2018',
      categoryId:2,
       statusId:1
    }

  ];
  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
