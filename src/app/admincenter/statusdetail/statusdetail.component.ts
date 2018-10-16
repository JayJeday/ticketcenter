import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/core/models/status.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { StatusService } from 'src/app/core/services/status.service';

@Component({
  selector: 'app-statusdetail',
  templateUrl: './statusdetail.component.html',
  styleUrls: ['./statusdetail.component.css']
})
export class StatusdetailComponent implements OnInit {

  status: Status;
  statusDesc: string;
  id:number;


  loading = false;
  updated = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statusService:StatusService

  ) { }

  ngOnInit() {
    
    //TODO use resolver service
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
         this.statusService.getStatusById(this.id);
      }
    );
    
  }


  update(){
    
    //call service  to update category here
    this.loading = true;
    this.statusService.updateStatus(this.statusService.status)
       .subscribe(data => {
          this.loading = false;
  
          //notification of succesfully saved
  
         //need to update list so it refresh it 
          this.statusService.getStatus();
          //route back to list
          this.gotoStatusList();
          console.log(this.statusService.status);
       });
   
  }

  cancel(){
    //go back to the list
    this.router.navigate(['../../'], { relativeTo: this.route });

  }
  
  gotoStatusList(){
    //go back
    //pass Value  to updated true activated message 
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

}
