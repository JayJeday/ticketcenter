import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  
  //ticket to send to server
  ticket:Ticket
  
  loading = false;
  success = false;

  //call categories services here.loaded from the database
  constructor(private categoryService:CategoriesService,
    private ticketService:TicketService, private fb:FormBuilder) {}

  ngOnInit() {
    //fill the category list 
      this.categoryService.getCategories();

      //console.log(this.categoryService.getCategories);
     this.ticketForm = this.fb.group({
        categoryid:['',Validators.required],
        description: ['', Validators.required],

      });

  }
  

  onAddTicket(){
    this.loading = true;

    this.ticketService.addTicket(this.ticketForm.value).subscribe(data => {
      this.loading  = false;
    });

    
    this.loading = false;
  }

}
