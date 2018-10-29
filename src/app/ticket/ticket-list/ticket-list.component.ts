import { Component, OnInit, Input, DoCheck, IterableDiffers, SimpleChanges, ViewChild } from '@angular/core';
import {Ticket} from  '../../core/models/ticket.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TicketService} from '../../core/services/ticket.service'
import { Subscription } from 'rxjs/Subscription';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Summary } from 'src/app/dashboard/summary.model';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/core/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit,DoCheck {

  @Input()listType;
  
  //by default
  @Input()filteredType;
  @Input()filteredProperty;

  @Input()id:number;

  //show normal list or filtered
  comp:string;
  techName:String;

  toogle:boolean = true;

  //paginator variables
    pageEvent: PageEvent;
    dataSource:null;
    pageIndex:number = 0;
    pageSize:number = 5;
    length:number;
    public array: any;

    iterableDiffer: any;
   
    tickets:Ticket[] = [];
    //for the tech
    tech:User;

    result:any;

    //table contents
    ticketData: MatTableDataSource<any>;

    //define Columns
    displayedColumns: string[] = ['TicketId', 'StatusDesc', 'Description', 'CategoryDesc', 'CreatedDate','actions'];
    @ViewChild(MatSort) sort: MatSort;


  constructor(private ticketService:TicketService,
     private router: Router,
     private route: ActivatedRoute,
     private dialog: MatDialog,
     private _iterableDiffers: IterableDiffers) {

      this.iterableDiffer =  this._iterableDiffers.find([]).create(null);
      }


     getPaginatorData(event){
      console.log(event);
  }
  
  ngOnInit() {
    //tickets by all
    if(this.listType !== "byUser"){
        this.ticketService.getTickets(1,5).subscribe((data)=>{
          this.tickets = data;
          this.ticketData = new MatTableDataSource(this.tickets);
          this.ticketData.sort = this.sort;
        });
        
    } 
    
      this.ticketService.getUserTicket2(this.id,1,5).subscribe((data)=>{
        this.tickets = data;
         this.ticketData = new MatTableDataSource(this.tickets);
         this.ticketData.sort = this.sort;
      });
    
   
  }

//this is called when the button of paginator is pressed
  public handlePage(e: any) {
    this.pageIndex = e.pageIndex+1;
    this.pageSize = e.pageSize;
    console.log(this.pageIndex);

  //we know the request is get ticket by tech id
    if(this.listType === "byUser"){
      this.tech = JSON.parse(localStorage.getItem('currentUser'));

      this.ticketService.getUserTicket2(this.tech.id,this.pageIndex,5).subscribe((data)=>{

        this.tickets = data;
        this.ticketData = new MatTableDataSource(this.tickets);
        this.ticketData.sort = this.sort;

      });
    
    }

    this.ticketService.getTickets(this.pageIndex,5).subscribe((data)=>{
      this.tickets = data;
      this.ticketData = new MatTableDataSource(this.tickets);
      this.ticketData.sort = this.sort;
    });
    
  }

  onEdit(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.data = {
      data: {
        ticketId: row
      }
    }
    this.dialog.open(TicketDetailComponent,dialogConfig);
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log("result" + this.result);
    
  }
  ngDoCheck(): void {
   //check if array has change
    let changes = this.iterableDiffer.diff(this.ticketService.ticketList);
    
    if (changes) {
        console.log('Changes detected!');
    }

    console.log("result" + this.result);
  }

}
