import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  email:string;
  password:string;

  loading = false;
  success = false;

  //pass this user to homeComponent for login purposes
  user:User;

  constructor(private fb:FormBuilder,private userService:UserService) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      
    });
  }

  onLogin(){

  }
}
