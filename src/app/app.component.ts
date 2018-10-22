import { Component, OnInit } from '@angular/core';
import { UsersService } from './core/services/users.service';
import { User } from './core/models/user.model';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 

  currentUser:User;
  isLoggin = false;
  

  role:string;

 constructor(private userService:UsersService,
  private authService:AuthenticationService
  ){

 }
  
 ngOnInit(): void {

  //need to declared outside
  console.log("message from app");
  
  //if user refresh the page
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  //when user log in
  this.userService.userLoggedIn.subscribe((data)=>{  
  //listen to when it user login
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log(this.currentUser);
    this.isLoggin = true;
  });

  //user log out close tabs
  this.authService.userlogout.subscribe((data)=>{
    this.isLoggin =false;
  });
  }

  ngOnChanges(){
    console.log("method called");
  }

  isNewticket:boolean;




}
