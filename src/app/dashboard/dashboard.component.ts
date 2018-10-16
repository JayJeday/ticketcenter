import { Component, OnInit } from '@angular/core';
import { TicketService } from '../core/services/ticket.service';
import { Summary } from './summary.model';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //get the summary from child
  summary:Summary;

  isCategorySearch:boolean;
  isRoleSearch:boolean;
  isStatusSearch:boolean;

  filterType:boolean = false;

  type:string="open";
  property:string="Status";

  statusBtnString;


  constructor(private ticketService:TicketService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    
    //call summary data
    this.ticketService.onSummaryCall();
    
    //pass go to route manually
//this.router.navigate(['tickets/status'], {relativeTo: this.route});
   
//pass data bettween component get  the data
  // this.ticketService.summaryActivated.subscribe((s:Summary)=>{
   //     this.summary = s;
    //    console.log(this.summary);
  // });

   
  }

  onSendStatus(){
   
    //if status is false search by open tickets first
    if(!this.filterType){
     //pass the value to other component to filter
    let result="result";
    
    }else{
     //search for false
  
    }
    this.filterType = !this.filterType;
  }


  //to appear button on screen
  onBtnStatus(){
    this.type = "open";
    this.property = "Status";
    this.isStatusSearch =  true;
    this.isRoleSearch = false;
    this.isCategorySearch = false;
  }

  onBtnCat(){
    this.type = "computers";
    this.property = "Category";
    this.isStatusSearch =  false;
    this.isRoleSearch = false;
    this.isCategorySearch = true;
  }

  onInputSearch(){
    this.type = "";
    this.property = "TechName";
    this.isStatusSearch =  false;
    this.isRoleSearch = true;
    this.isCategorySearch = false;
  }



}
