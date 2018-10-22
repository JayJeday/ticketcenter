import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userlogout = new Subject();

  constructor(private router: Router) { }

  logout(){
  
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl('/home');
      
      this.userlogout.next(false);
  }
}
