import { Component, OnInit } from '@angular/core';
import { StatusService } from '../core/services/status.service';
import { Status } from '../core/models/status.model';

@Component({
  selector: 'app-admincenter',
  templateUrl: './admincenter.component.html',
  styleUrls: ['./admincenter.component.css']
})
export class AdmincenterComponent implements OnInit {

  
  constructor(private statusService:StatusService ) { }

  ngOnInit() {
    this.statusService.getStatus();
    console.log(this.statusService.statusList);
  }



}
