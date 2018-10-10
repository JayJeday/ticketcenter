import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';
import { Ticket } from 'src/app/core/models/ticket.model';


@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.css']
})
export class TicketAddComponent implements OnInit {

  ticketForm: FormGroup;
  //load from service
  categories:Category[];
  //ticket to send to server
  ticket:Ticket
  

  //call categories services here.loaded from the database
  constructor(private categoryService:CategoriesService) {
  
   }

  ngOnInit() {
      console.log(this.categoryService.getCategories());
  }
  
  onAddTicket(){
    
    console.log("call from form");
  }

}
