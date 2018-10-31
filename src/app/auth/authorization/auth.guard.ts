import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private router: Router){}
//The auth guard is used to prevent unauthenticated users from accessing restricted routes
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(localStorage.getItem('currentUser') != null)
  
      return true;

     // not logged in so redirect to login page with the return url 
    this.router.navigate(['/home']);
    return false;
  }
}
