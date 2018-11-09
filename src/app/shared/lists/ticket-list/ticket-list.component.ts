import { Component, OnInit, Input, DoCheck, IterableDiffers, SimpleChanges, ViewChild } from '@angular/core';
import {Ticket} from  '../../../core/models/ticket.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TicketService} from '../../../core/services/ticket.service';
import { PageEvent } from '@angular/material/paginator';
import { User } from 'src/app/core/models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketDetailComponent } from '../../../shared/details/ticket-detail/ticket-detail.component';


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
    displayedColumns: string[] = ['TicketId', 'StatusDesc', 'Description', 'CategoryDesc', 
    'CreatedDate','actions'];
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
    if(this.listType === "dash" || this.listType === "admin"){

      this.displayedColumns.splice(3,0,"Technician");

        this.ticketService.getTickets(1,5).subscribe((data)=>{
          this.tickets = data;
          this.ticketData = new MatTableDataSource(this.tickets);
          this.ticketData.sort = this.sort;
        });
        
    } 
   //by technician 
if(this.listType === "byUser"){

 this.ticketService.getUserTicket2(this.id,1,5).subscribe((data)=>{
        this.tickets = data;
         this.ticketData = new MatTableDataSource(this.tickets);
         this.ticketData.sort = this.sort;
      });

}
       

//admin updated the ticket
this.ticketService.ticketChanged.subscribe((changed)=>{
  console.log("from here");
  this.ticketService.getTickets(1,5).subscribe((data)=>{
    this.tickets = data;
    this.ticketData = new MatTableDataSource(this.tickets);
  });

});
   
  }

  applyFilter(filterValue: string) {
    this.ticketData.filter = filterValue.trim().toLowerCase();
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

    //admin updated the ticket
    this.ticketService.ticketChanged.subscribe((data)=>{
      console.log("from here");
      this.ticketService.getTickets(this.pageIndex,5).subscribe((data)=>{
        this.tickets = data;
        this.ticketData = new MatTableDataSource(this.tickets);
      });

    });

    this.ticketService.getTickets(this.pageIndex,5).subscribe((data)=>{
      this.tickets = data;
      this.ticketData = new MatTableDataSource(this.tickets);
      this.ticketData.sort = this.sort;
    });
    
  }

  onEdit(row){
    const dialogRef = this.dialog.open(TicketDetailComponent, {
       width: '60%',
       data:{id:row,type:this.listType}
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

    console.log("result" + this.result);
    
  }
  ngDoCheck(): void {
   //check if array has change
    let changes = this.iterableDiffer.diff(this.tickets);
    
    if (changes) {
        console.log('Changes detected!');
    }

    console.log("result" + this.result);
  }

}
