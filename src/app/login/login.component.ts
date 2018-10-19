import { Component, OnInit } from '@angular/core';
import { User } from '../core/models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UsersService } from '../core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';


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

  constructor(private fb:FormBuilder,
    private usersService:UsersService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      
      Email:['',Validators.required],
      Password:['', Validators.required]

    });
  }

login(){
    this.loading = true;
    
    this.usersService.getUserByCred(this.loginForm.value).subscribe(data => {
      this.loading  = false;
      
      //TODO do mapping better 
      
      this.user = new User();
      
      this.user.id = data[0].id;
      this.user.FirstName = data[0].FirstName;
      this.user.LastName = data[0].LastName;
      this.user.RoleId = data[0].RoleId;
      this.user.Role = data[0].Role;

      this.usersService.loggedUser = this.user;


       this.usersService.userLoggedIn.next(true);
     
      if(this.user.Role === 'admin'){
         //go to dashboard page
         this.router.navigateByUrl('/dashboard');
      }
      else if(this.user.Role === 'technician'){
      //go to technician page
          this.router.navigate(['tech', this.user.id]);
      }
    });

   

    
    this.loading = false;
  }

  ngOnChanges(){
    
    
  }


}
