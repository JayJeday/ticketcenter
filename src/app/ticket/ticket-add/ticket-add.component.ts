import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';
import { Ticket } from 'src/app/core/models/ticket.model';
import { TicketService } from 'src/app/core/services/ticket.service';


@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.css']
})
export class TicketAddComponent implements OnInit {

  ticketForm: FormGroup;
  //load from service

  //ticket to send to server
  ticket:Ticket
  

  //call categories services here.loaded from the database
  constructor(private categoryService:CategoriesService,private ticketService:TicketService) {
    
   }

  ngOnInit() {
    //fill the category list 
      this.categoryService.getCategories();

      this.ticketForm = new FormGroup({
          'ticketData': new FormGroup({
            'description': new FormControl(null,[Validators.required]),
            'category': new FormControl()
          })
      });
  }
  
  onAddTicket(){
   this.ticketService.addTicket(this.ticket);
   this.ticketForm.reset();
  }

}
