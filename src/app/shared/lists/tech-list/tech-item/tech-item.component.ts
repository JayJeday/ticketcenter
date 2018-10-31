import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-tech-item',
  templateUrl: './tech-item.component.html',
  styleUrls: ['./tech-item.component.css']
})
export class TechItemComponent implements OnInit {


  @Input() tech:User;
  
  @Input() itemType:string;

  constructor(private userService:UsersService) { }

  ngOnInit() {
  }

  updateUserTicket(){
    this.userService.userChanged.next(this.tech);
  }

}
