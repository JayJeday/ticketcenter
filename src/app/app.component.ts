import { Component, OnInit } from '@angular/core';
import { UsersService } from './core/services/users.service';
import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  isLoggin = false;
  role:string;

 constructor(private userService:UsersService){}
  
 ngOnInit(): void {

  //need to declared outside
  console.log("message from app")

  //get the role
  
  
  this.userService.userLoggedIn.subscribe((data)=>{
    console.log(this.userService.loggedUser);
  //listen to when it change
  this.role = this.userService.loggedUser.Role;

  });

  }

  ngOnChanges(){
    console.log("method called");
  }

  isNewticket:boolean;




}
