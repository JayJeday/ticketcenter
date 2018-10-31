import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';
import { Ticket } from 'src/app/core/models/ticket.model';
import { TicketService } from 'src/app/core/services/ticket.service';
import { User } from 'src/app/core/models/user.model';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticketForm: FormGroup;
  
  //ticket to send to server
  ticket:Ticket
  
  success:boolean;

  loading = false;

  client:User;

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
  

  get f() { return this.ticketForm.controls; }


  onAddTicket(){
    this.loading = true;

    //get user id from local storage
    this.client = JSON.parse(localStorage.getItem('currentUser'));

    this.ticket = new Ticket();
    this.ticket.ClientId = Number(this.client.ClientId);
    this.ticket.Description = this.f.description.value;
    this.ticket.CategoryId = this.f.categoryid.value;


    this.ticketService.addTicket(this.ticket).subscribe(data => {
      this.loading  = false;
      this.ticketForm.reset();
      this.success = true;
      //display notification

    });

    
    this.loading = false;
  }

}
