import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

//JWT authentication service is used to login and logout of the application,
// to login it posts the users credentials to the api and checks the response for a 
//JWT token. if there is one it means authentication was successful so the user details 
//are added to local storage with the token

export class AuthenticationService {

  userlogout = new Subject();

  constructor(private http:HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>(`http://localhost:2175/token`, { email, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        }));
}




  logout(){
  
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }
}
