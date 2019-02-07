import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userChanged = new Subject();

  roleChanged = new Subject();

 // loggedUser = new User();
  userLoggedIn = new Subject();

  //client is waiting to chat
  constructor(private apiService:ApiService) { }

  getU(){
    return this.apiService.get('user')
    .pipe(map((data:any) => {

      return data as User[];

    }));

  }

  //to get tech and update category
  getUserById(id:number){
    
    return this.apiService.get('user/'+ id)
    .pipe(map((data:any)=> {

      return data as User[]
    }));
    
  }


  getUserRoleById(id:number){
    return this.apiService.get('user/role?id='+ id)
    .pipe(map((data:any)=>{
      //return first
      return data as User[];
    }));

  }

  //*** Post method for user login ****
  //TODO add oauth
  getUserByCred(user:User){
    return this.apiService.post('login',user).pipe(map(x =>x.json()));
  }

  updateUser(user:User){
    return this.apiService.put("user",user);
  }

  createEmployee(user:User){
    return this.apiService.post('user',user);
  }

  registerClient(user:User){
    return this.apiService.post('user/register',user);
  }
  
  getTechs(){
    return this.apiService.get('user/techs').pipe(map((data:any) => {
    
      return data as User[];
    
    }));
  }

  updateTechCat(tech:User){
    return this.apiService.put("user/tech/cat",tech);
  }
  
}
