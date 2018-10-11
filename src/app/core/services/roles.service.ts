import { Injectable } from '@angular/core';
import {Role} from '../models/rode.model';

import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class RolesService {

  roleList:Role[];

  constructor(private http:Http) { }

  getRoles(){
    this.http.get('http://localhost:2175/api/ticket/getroles')
    .map(
      (data : Response) =>{  return data.json() as Role[]; })
    .toPromise().then(x => {
      this.roleList = x;
    }).catch((x)=>'error was called');
  }

}
