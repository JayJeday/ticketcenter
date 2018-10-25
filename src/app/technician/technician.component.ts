import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TicketService } from 'src/app/core/services/ticket.service';
import { StatusService } from '../core/services/status.service';
import { MatRadioChange } from '@angular/material/radio';
import { User } from '../core/models/user.model';


@Component({
  selector: 'app-technician',
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.css']
})
export class TechnicianComponent implements OnInit {

 //@ViewChild('selected') statusbar;
  //routeId
  id:number;
  userTickets = 'byUser';

  constructor(private route: ActivatedRoute,private router: Router, 
     private ticketService:TicketService,
     private statusService:StatusService
     ) { }

  type:string;
  property:string;
  
  tech:User;
    techName:string;

  statusRb:string;

  

  ngOnInit() {
    //get route pass id when user login
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];

        // this.ticketService.getUserTicket(this.id);
          //default call
          this.ticketService.getUserTicket2(this.id,1,5);
      }
    );
    this.statusService.getStatus();


   this.tech = JSON.parse(localStorage.getItem('currentUser'));
   this.techName = this.tech.FirstName + " " + this.tech.LastName;
  }


 setSearch(value){
    if(value === 'selectAll'){
      this.property = '';
      this.type = '';
      console.log(this.type);
    }else{
       this.property = value;

       
    } 

    }

    


    radioChange($event: MatRadioChange) {
      console.log($event.source.name, $event.value);
      
      //descendin date
      if ($event.value === '1') {
        return this.ticketService.ticketList.sort((a, b) => {
          return <any>new Date(b.CreatedDate) - <any>new Date(a.CreatedDate);
        });
      }
      //ascending date
       if($event.value === '2'){

         return this.ticketService.ticketList.sort((a, b) => {
          return <any>new Date(a.CreatedDate) - <any>new Date(b.CreatedDate);
        });

       }
  }


}
