import { Component, OnInit,Inject } from '@angular/core';
import { Ticket } from 'src/app/core/models/ticket.model';
import { TicketService } from 'src/app/core/services/ticket.service';
import {FormBuilder, FormGroup, Validators, FormControl, NgForm} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StatusService } from 'src/app/core/services/status.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Status } from 'src/app/core/models/status.model';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  ticket:Ticket = {} as Ticket;
  aticket:Ticket = {} as Ticket;
  statusList:Status[];

  id:number;
  loading = false;
  selected:number;

  //which components the data will operate on
  comp:string;


  constructor(private route: ActivatedRoute,
    private router: Router,  
    public ticketService:TicketService,
    public statusService:StatusService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TicketDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {

    //get the  route parameter
     this.ticketService.getTicket(this.data.id).subscribe((data)=>{
       this.ticket = data[0];
       console.log(this.ticket);
     });
     
      this.comp = this.data.type;
    console.log(this.comp);

    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
       
      }
    );

    //this.route.data
   // .subscribe((data)=>{
    //  this.comp = data['comp'];
      
   // });

    this.statusService.getStatus().subscribe((data)=>{
      this.statusList = data; 
    });

    
  }

  onEditTicket(form:NgForm){
    this.loading = true;

    this.aticket.TicketId = this.ticket.TicketId;
    
    //if comment is null get the one from service
    this.aticket.Comment = form.value.Comment;
    
    this.aticket.StatusId = form.value.StatusId;

    //get the ticket user id from the service
     this.aticket.TechId = this.ticket.TechId;

    console.log(JSON.stringify(this.aticket));

    //pass back the same ticket
    this.ticketService.updateTicket(this.aticket)
     .subscribe(data => {
        this.loading = false;

       this.snackBar.open("Ticket Updated successfully",'', {
        duration: 1000
      });

       //need to update list so it refresh it 
       //Update fro  admin
       if(this.comp ==="admin"){
         //update tech list-- go to the first page
         console.log("was called");
        this.ticketService.ticketChanged.next(true);
       }
       
     },
     error=>{
      this.snackBar.open("Error ocurred");
     });

    this.loading = false;
    
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
