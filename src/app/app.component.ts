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

  //save this in local storage
  isLoggin = false;
  

  role:string;

 constructor(private userService:UsersService,
  private authService:AuthenticationService
  ){

 }
  
 ngOnInit(): void {

  //need to declared outside
  console.log("message from app");
  
//get loggin from storage
  this.isLoggin = JSON.parse(localStorage.getItem('loggin'));

  //if user refresh the page
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  //when user log in
  this.userService.userLoggedIn.subscribe((data)=>{  
    //listen to when it user login
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log(this.currentUser);
    this.isLoggin = true;

    //create loggin
    localStorage.setItem('loggin', JSON.stringify(this.isLoggin));
  });

  //user log out close tabs
  this.authService.userlogout.subscribe((data)=>{
    this.isLoggin =false;

    //remove logged in
    localStorage.removeItem('loggin');
  });
  }

  ngOnChanges(){
    console.log("method called");
  }

  isNewticket:boolean;




}
