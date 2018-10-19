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
  property:string="StatusDesc";

  statusBtnString;

  //for status => 
  public doughnutChartLabels:string[] = ['Tickets Open', 'Tickets Close'];
  public doughnutChartStatusData:number[];
  public doughnutChartCategoryData:number[];
  public doughnutChartType:string = 'doughnut';
 

  //for categories
  public doughnutChartLabels2:string[] = ['Cell phones', 'Computers'];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(private ticketService:TicketService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

    public chartColorsStatus: Array<any> = [
      { // all colors in order
        backgroundColor: ['#d13537', '#b0o0b5', '#coffee']
      }
    ]
      public chartColorsCategories: Array<any> = [
        { // all colors in order
          backgroundColor: ['#d13537', '#b0o0b5', '#coffee']
        }

  ]


  ngOnInit() {
    
    //call summary data
    this.ticketService.onSummaryCall();
    
    this.doughnutChartStatusData = [this.ticketService.summary.numTicketsOpen,this.ticketService.summary.numTicketsClose];

    this.doughnutChartCategoryData = [this.ticketService.summary.numTicketsOpen,this.ticketService.summary.numTicketsClose];

    
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
    this.property = "StatusDesc";
    this.isStatusSearch =  true;
    this.isRoleSearch = false;
    this.isCategorySearch = false;
  }
  //TODO add this dynamically
  onBtnCat(){
    this.type = "computers";
    this.property = "CategoryDesc";
    this.isStatusSearch =  false;
    this.isRoleSearch = false;
    this.isCategorySearch = true;
  }


  //TODO add this dynamically
  onInputSearch(){
    this.type = "";
    this.property = "TechName";
    this.isStatusSearch =  false;
    this.isRoleSearch = true;
    this.isCategorySearch = false;
  }






}
