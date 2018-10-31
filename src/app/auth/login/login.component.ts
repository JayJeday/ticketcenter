import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../core/models/user.model';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { UsersService } from '../../core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../core/services/authentication.service';
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

  loggedUser:User;

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
    console.log(this.f.email.value);
    this.authenticationService.login(this.f.email.value,this.f.password.value)
    .pipe(first())
    .subscribe(
        data => {
          //store data in the browser
          //parse id fix for now
          this.loggedUser = JSON.parse(JSON.stringify(data));

          //convert the strings into int  quick fix
          this.loggedUser.id = Number(this.loggedUser.aId);
          this.loggedUser.RoleId = Number(this.loggedUser.aRoleId);

          //need tech id
          this.loggedUser.techId = Number(this.loggedUser.aEmpId);

          localStorage.setItem('currentUser', JSON.stringify(this.loggedUser));
          
          console.log("logged user" + this.loggedUser);
          this.success = true;
          this.loading  = false;
          this.dialogRef.close();

          this.usersService.userLoggedIn.next(true);

          //if user has role and client id empty 
      if(this.loggedUser.RoleId === 2 && this.loggedUser.ClientId == ""){
         //go to dashboard page
         this.router.navigateByUrl('dashboard');
      }
      else if(this.loggedUser.RoleId === 1 && this.loggedUser.ClientId == ""){
      //go to technician page
          this.router.navigate(['technician', this.loggedUser.techId]);
        }else if(this.loggedUser.aRoleId == ""){
      //user does not have a role then go to add tickets
        this.router.navigateByUrl('/addTicket');
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
