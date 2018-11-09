import { Injectable } from '@angular/core';
import {Role} from '../models/rode.model';

import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RolesService {

  roleList:Role[];

  constructor(private apiService:ApiService) { }

  getRoles(){
    return  this.apiService.get('role').pipe(map((data:any)=>{

      return data as Role[];
   
    }));
  }

}
