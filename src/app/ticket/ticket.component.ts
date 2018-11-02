import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';
import { Ticket } from 'src/app/core/models/ticket.model';
import { TicketService } from 'src/app/core/services/ticket.service';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from '../core/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticketForm: FormGroup;
  
  //ticket to send to server
  ticket:Ticket
  
  users:User[] = [];

  tech:User;

  success:boolean;

  loading = false;

  client:User;

  //techId to be passed from to be notify it.
  techId:number;


  //call categories services here.loaded from the database
  constructor(public categoryService:CategoriesService,
    public ticketService:TicketService,
    public userService:UsersService,
    private router: Router,
    ) {}

  ngOnInit() {
    //fill the category list 
      this.categoryService.getCategories();
      this.userService.getTechs().subscribe((data:any)=> {
        this.users = data;
      });

      //console.log(this.categoryService.getCategories);

      this.ticketForm = new FormGroup({
          'categoryid': new FormControl('', [Validators.required]),
          'description': new FormControl(null, [Validators.required])
        });

         this.client = JSON.parse(localStorage.getItem('currentUser'));
  }
  

  get f() { return this.ticketForm.controls; }


  onAddTicket(){
    this.loading = true;

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

    onManageTicketToChat(){
    //get the ticket 
      this.ticketService.getTicketByClientId(Number(this.client.ClientId))
      .subscribe((data:Ticket[])=> {

        //return user
        let t  = this.selectTechAndUpdateTickets(data[0]);
       
        //update ticket with the user id => tech id
        this.ticketService.updateTicket(t).subscribe((data:any)=>{

          console.log(data);

        });
        //pass the tech Id to chat. clear history
        this.router.navigate(['/chat', this.techId],{replaceUrl: true});

      });

    }

    private selectTechAndUpdateTickets(ticket:Ticket){
      
      //get the ticket category
      this.users.forEach((u:User)=>{

        if(u.CategoryDesc === ticket.CategoryDesc && u.InChat === false){
        //get the user if is not in chat and have that category
           this.tech = u;

        }else if(u.InChat === false){
          //get this user because all the tech are in chat 
          this.tech = u;
         
        }

      });

      //update the tickets
      ticket.TechId = this.tech.id;
      
      //receive the id of the technician 
      this.techId = this.tech.id;


      return ticket;
    }
}
