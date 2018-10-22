import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../core/models/user.model';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { UsersService } from '../core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../core/services/authentication.service';
import { first } from 'rxjs/operators';




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
  
  success:boolean;

  invalidCred:boolean;

  error = '';


  //pass this user to homeComponent for login purposes
  user:User;

  constructor(
    private usersService:UsersService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
      
      this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required,Validators.email]),
        'password': new FormControl(null, [Validators.required])
      });
  }

  get f() { return this.loginForm.controls; }


login(){
    this.loading = true;
    
    this.authenticationService.login(this.f.email.value,this.f.password.value)
    .pipe(first())
    .subscribe(
        data => {
          console.log(data);
          this.success = true;
          this.loading  = false;
          this.dialogRef.close();

      if(this.user.Role === 'admin'){
         //go to dashboard page
         this.router.navigateByUrl('/dashboard');
      }
      else if(this.user.Role === 'technician'){
      //go to technician page
          this.router.navigate(['tech', this.user.id]);
        }
  
        },
        error => {
            this.error = error;
            this.loading = false;
        });
     
    }
    

  closeDialog(){
    this.dialogRef.close();
  }

  ngOnChanges(){
    
    
  }


}
