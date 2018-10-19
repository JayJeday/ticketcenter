import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user:User;
  @Input() index:number;

  @Input() itemType:string;

  constructor(private userService:UsersService) { }

  ngOnInit() {
    console.log(this.user.CategoryId);
  }

  updateUserTicket(){
    this.userService.userChanged.next(this.user);
  }
}
