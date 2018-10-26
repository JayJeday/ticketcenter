import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../core/services/users.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { first } from 'rxjs/operators';
import { User } from '../core/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup;

  loading = false;

  loggedUser:User;

  error = '';


  constructor(private userService:UsersService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {

    this.regForm = new FormGroup({
      'FirstName': new FormControl('', [Validators.required]),
      'LastName': new FormControl(null, [Validators.required]),
      'Email': new FormControl(null,[Validators.required,Validators.email]),
      'Password': new FormControl('', [Validators.required]),
    });

  }
  
get f() { return this.regForm.controls; }

onRegisterUser(){


  this.loading = true;
  
this.userService.registerClient(this.regForm.value).subscribe(
  data => {
 
},error =>{
  console.log(error);

});


//login user  

this.authenticationService.login(this.f.Email.value,this.f.Password.value)
.pipe(first())
.subscribe(
    data => {
      //store data in the browser
      //parse id fix for now
      this.loggedUser = JSON.parse(JSON.stringify(data));

      //convert the strings into int  quick fix
      this.loggedUser.id = Number(this.loggedUser.aId);
      this.loggedUser.RoleId = Number(this.loggedUser.aRoleId);


      localStorage.setItem('currentUser', JSON.stringify(this.loggedUser));
      
      console.log(this.loggedUser);
  
      this.loading  = false;

      this.userService.userLoggedIn.next(true);

    
      this.router.navigateByUrl('/addTicket');

    },
    error => {
        this.error = error;
        this.loading = false;
    });

}
}







