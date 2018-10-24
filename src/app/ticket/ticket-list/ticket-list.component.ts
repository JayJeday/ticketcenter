import { Component, OnInit, Input, DoCheck, IterableDiffers, SimpleChanges } from '@angular/core';
import {Ticket} from  '../../core/models/ticket.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TicketService} from '../../core/services/ticket.service'
import { Subscription } from 'rxjs/Subscription';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Summary } from 'src/app/dashboard/summary.model';


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

  //show normal list or filtered
  comp:string;
  techName:String;

  toogle:boolean = true;
  
    pageIndex:number = 0;
    pageSize:number = 5;
    lowValue:number = 0;
    highValue:number= 5;
    iterableDiffer: any;

    result:any;

  constructor(private ticketService:TicketService,
     private router: Router,
     private route: ActivatedRoute,
     private _iterableDiffers: IterableDiffers) {

      this.iterableDiffer =  this._iterableDiffers.find([]).create(null);
      }


     getPaginatorData(event){
      console.log(event);

      if(event.pageIndex == this.pageIndex + 1){
         this.lowValue = this.lowValue + this.pageSize;
         this.highValue =  this.highValue + this.pageSize;
        }
     else if(event.pageIndex == this.pageIndex - 1){
        this.lowValue = this.lowValue - this.pageSize;
        this.highValue =  this.highValue - this.pageSize;
       }   
        this.pageIndex = event.pageIndex ;
  }
  
  ngOnInit() {
    if(this.listType !== "byUser"){
        this.ticketService.getTickets();
    } 
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("result" + this.result);
    
  }
  ngDoCheck(): void {
   
    let changes = this.iterableDiffer.diff(this.ticketService.ticketList);
    if (changes) {
        console.log('Changes detected!');
    }

    console.log("result" + this.result);
  }

}
