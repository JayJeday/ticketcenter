import { Component, OnInit, Input } from '@angular/core';
import { Status } from 'src/app/core/models/status.model';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { StatusService } from 'src/app/core/services/status.service';
import { switchMap } from 'rxjs-compat/operator/switchMap';

@Component({
  selector: 'app-statuslist',
  templateUrl: './statuslist.component.html',
  styleUrls: ['./statuslist.component.css']
})
export class StatuslistComponent implements OnInit {

  subscription: Subscription;
 // @Input() statusList:Status[];

 displayAddForm = false;
 statusAdded:string;

 loading = false;



  constructor(private service:StatusService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.getStatus();

    this.route.params
    .subscribe(
      (params: Params) => {
        
         console.log("Is called");
      }
    );

  }

  addStatus(){
    
    var c = new Status();
    c.StatusDesc = this.statusAdded;
    this.loading = true;

    this.service.addStatus(c).subscribe(data => {
      
      //update list
      this.service.getStatus();
      //snackebar that notify list changed
      
   });

    //close button to add 
    this.displayAddForm =false;
  }

showForm(){
  this.displayAddForm =!this.displayAddForm;
}

}
