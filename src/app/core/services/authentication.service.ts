import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RequestOptions, RequestMethod } from '@angular/http';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})

//JWT authentication service is used to login and logout of the application,
// to login it posts the users credentials to the api and checks the response for a 
//JWT token. if there is one it means authentication was successful so the user details 
//are added to local storage with the token

export class AuthenticationService {

  userlogout = new Subject();

  constructor(private http:HttpClient,
    private usersService:UsersService,
    private route: ActivatedRoute,
    private router: Router) { }


login(userName, password) {
   var data = "username=" + userName + "&password=" + password + "&grant_type=password";
   var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True'});
    return this.http.post('http://localhost:2175/token', data, { headers: reqHeader });
  }



  logout(){
  
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      
      this.router.navigateByUrl('/home');
      this.userlogout.next(false);
  }
}
