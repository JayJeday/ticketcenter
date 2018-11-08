import { Component, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TicketService } from '../core/services/ticket.service';
import { Summary } from './summary.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../core/services/categories.service';
import { StatusService } from '../core/services/status.service';
import { MatRadioChange } from '@angular/material/radio';
import { BaseChartDirective } from 'ng2-charts';
import { forkJoin } from 'rxjs';
import { Category } from '../core/models/category.model';
import { Status } from '../core/models/status.model';


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


//fork join stuff 
categoryList:Category[] = [];
statusList:Status[];
categorySummary:Summary[];
statusSummary:Summary[];

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

    //************** multiple sequential request **************
    /*
    this.homeworld = this.http.get('/api/people/1').pipe(
      mergeMap(character => this.http.get(character.homeworld))
    );

 forkJoin([categorySummary,statusSummary]).subscribe(results =>{
      this.categoryPerformSummay(results[0]);
      this.statusPerformSummary(results[1]);
    });

    */

      this.categoryService.getCategoriesSummary().toPromise().then(data =>{
           this.categoryPerformSummay(data);
          });

      this.statusService.getStatusSummary().toPromise().then(data =>{
        this.statusPerformSummary(data);
        //set graphic status to chart 
      });

   this.doughnutChartLabels2 = this.categoryNameData;
    this.doughnutChartCategoryData = this.categoryData;

    this.doughnutChartStatusData = this.statusData;
    this.doughnutChartLabels = this.statusNameData;

    console.log(this.statusData);
  // this.doughnutChartStatusData = [this.ticketService.summary.numTicketsOpen,this.ticketService.summary.numTicketsClose];

  }

  private categoryPerformSummay(categoriesSummary:any[]){

    //create observable when list changes to this
    categoriesSummary.forEach((s:Summary)=> {

      this.categoryData.push(s.categoriesNumber);
      this.categoryNameData.push(s.CategoryDesc);
    
    });
    

  }

  private statusPerformSummary(statusSummary:any[]){

        statusSummary.forEach((s:Summary)=> {
          
      this.statusData.push(s.statusNumber);
      this.statusNameData.push(s.StatusDesc);
  });

  } 

  ngAfterViewInit() {

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
