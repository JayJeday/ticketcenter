import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userList:User[];
  user:User;

  constructor(private http:Http) { }

  getU(){
    this.http.get('http://localhost:2175/api/user')
    .map(
      (data : Response) =>{  return data.json() as User[]; })
    .toPromise().then(x => {
      this.userList = x;
    }).catch((x)=>'error was called');
  }

  getUserById(id:number){
    this.http.get('http://localhost:2175/api/user/'+ id)
    .map(
      (data : Response) =>{  return data.json() as User[] })
    .toPromise().then(x => {
      this.user = x[0];
    }).catch((x)=>'error was called');
  }

  getUserByCred(){

  }

  updateUser(user:User){
    var body = JSON.stringify(user);
    console.log(body);
    var headerOptions = new Headers({ 'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put("http://localhost:2175/api/user",
      body,
      requestOptions).map(res => res.json());
  }

  createUser(){
    
  }
}
