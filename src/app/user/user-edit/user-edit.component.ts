import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Input() user:User;
  
  constructor() { }

  ngOnInit() {
  }

  onUpdateUser(){
    console.log("Update User");
  }

}
