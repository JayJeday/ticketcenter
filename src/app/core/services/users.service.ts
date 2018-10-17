import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userList:User[];

  constructor(private http:Http) { }

  getU(){
    this.http.get('http://localhost:2175/api/user')
    .map(
      (data : Response) =>{  return data.json() as User[]; })
    .toPromise().then(x => {
      this.userList = x;
    }).catch((x)=>'error was called');
  }

  getUserById(){

  }

  getUserByCred(){

  }

  addUser(){
    
  }
}
