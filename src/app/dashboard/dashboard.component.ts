import { Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TicketService } from '../core/services/ticket.service';
import { Summary } from './summary.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../core/services/categories.service';
import { StatusService } from '../core/services/status.service';
import { MatRadioChange } from '@angular/material/radio';
import { BaseChartDirective } from 'ng2-charts';


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
//overall status
  type:string="open";
  property:string="StatusDesc";


  //dash list
  dashType:string='dash';


  //defaultstatus by tabs
  statType:string ='';
  defaultStatusproperty:string="StatusDesc";

  //by categories
  defaultCatproperty:string="CategoryDesc";
  catType:string ='';

  //by tech name
  userInput:string = '';
  techProperty:string = "TechName";

  statusBtnString;

categoryData:number[] = [];
statusData:number[] = [];

categoryNameData:string[] = [];
statusNameData:string[] = [];


  //for status => 
  public doughnutChartLabels:string[];
  public doughnutChartStatusData:number[];

  public doughnutChartCategoryData:number[];
  public doughnutChartType:string = 'doughnut';
 

  //for categories
  public doughnutChartLabels2:string[];

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(private ticketService:TicketService,
    private categoryService:CategoriesService,
    private statusService:StatusService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

    public chartColorsStatus: Array<any> = [
      { // all colors in order
        backgroundColor: ['#1B5E20', '#4CAF50', '#00C853']
      }
    ]
      public chartColorsCategories: Array<any> = [
        { // all colors in order
          backgroundColor: ['#01579B', '#00B0FF', '#80DEEA']
        }

  ]


  ngOnInit() {
    
    //call summary data
    this.categoryService.getCategoriesSummary();
    this.statusService.getStatusSummary();
    this.categoryService.getCategories();
    this.statusService.getStatus();

    console.log(this.categoryService.categorySummaryList);
    console.log(this.statusService.statusSummaryList);

    //create observable when list changes to this
    this.categoryService.categorySummaryList.forEach((s:Summary)=> {
      this.categoryData.push(s.categoriesNumber);
      this.categoryNameData.push(s.CategoryDesc);
    });

    //iterate over status list
 this.statusService.statusSummaryList.forEach((s:Summary)=> {
 this.statusData.push(s.statusNumber);
 this.statusNameData.push(s.StatusDesc);
});

    //set graphic categories to chart 
    this.doughnutChartCategoryData = this.categoryData;
    this.doughnutChartLabels2 = this.categoryNameData;


    //set graphic status to chart 
    this.doughnutChartStatusData = this.statusData;
    this.doughnutChartLabels = this.statusNameData;



    console.log(this.categoryData);
  // this.doughnutChartStatusData = [this.ticketService.summary.numTicketsOpen,this.ticketService.summary.numTicketsClose];

  }

  ngAfterViewInit() {

    this.categoryService.getCategoriesSummary();
    this.statusService.getStatusSummary();
    this.categoryService.getCategories();
    this.statusService.getStatus();

  }
  categoryChange($event: MatRadioChange){
    this.catType = $event.value;
  }

  statusChange($event: MatRadioChange){
      this.statType = $event.value;
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

}
