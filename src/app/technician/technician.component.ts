import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TicketService } from 'src/app/core/services/ticket.service';
import { StatusService } from '../core/services/status.service';
import { MatRadioChange } from '@angular/material/radio';


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

  statusRb:string;

  ngOnInit() {
    //get route pass id when user login
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
         this.ticketService.getUserTicket(this.id);
      }
    );
    this.statusService.getStatus();
   //   this.statusRb = this.statusService.statusList[0].StatusDesc;
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
      
      //descendin
      if ($event.value === '1') {
        return this.ticketService.ticketList.sort((a, b) => {
          return <any>new Date(b.CreatedDate) - <any>new Date(a.CreatedDate);
        });
      }
      //ascending
       if($event.value === '2'){

         return this.ticketService.ticketList.sort((a, b) => {
          return <any>new Date(a.CreatedDate) - <any>new Date(b.CreatedDate);
        });

       }
  }


}
