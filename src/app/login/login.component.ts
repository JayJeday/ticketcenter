import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../core/models/user.model';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { UsersService } from '../core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';



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


  //pass this user to homeComponent for login purposes
  user:User;

  constructor(
    private usersService:UsersService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>
    ) { }

  ngOnInit() {
      
      this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required,Validators.email]),
        'password': new FormControl(null, [Validators.required])
      });
  }

login(){
    this.loading = true;
    
    this.usersService.getUserByCred(this.loginForm.value).subscribe(data => {
      this.success = true;
      this.loading  = false;

      //save the current user in local storage
      localStorage.setItem('currentUser', JSON.stringify(data[0]));

      var obj = JSON.stringify(data[0]);
      this.user = JSON.parse(obj);
     
      console.log(this.user);
       this.usersService.userLoggedIn.next(true);
     
      this.loading = false;
      
      this.dialogRef.close();
      
      if(this.user.Role === 'admin'){
         //go to dashboard page
         this.router.navigateByUrl('/dashboard');
      }
      else if(this.user.Role === 'technician'){
      //go to technician page
          this.router.navigate(['tech', this.user.id]);
      }
    }, error => {
      if(error.status === 404){
        this.invalidCred = true;
      }
      this.loading = false;
    });
    
    

  }

  closeDialog(){
    this.dialogRef.close();
  }

  ngOnChanges(){
    
    
  }


}
