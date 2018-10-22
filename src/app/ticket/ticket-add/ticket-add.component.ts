import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
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
  
  success:boolean;

  loading = false;

 

  //call categories services here.loaded from the database
  constructor(private categoryService:CategoriesService,
    private ticketService:TicketService) {}

  ngOnInit() {
    //fill the category list 
      this.categoryService.getCategories();

      //console.log(this.categoryService.getCategories);

      this.ticketForm = new FormGroup({
          'categoryid': new FormControl('', [Validators.required]),
          'description': new FormControl(null, [Validators.required])
        });

       


  }
  

  onAddTicket(){
    this.loading = true;

    this.ticketService.addTicket(this.ticketForm.value).subscribe(data => {
      this.loading  = false;
      this.ticketForm.reset();
      this.success = true;
      //display notification
    });

    
    this.loading = false;
  }

}
