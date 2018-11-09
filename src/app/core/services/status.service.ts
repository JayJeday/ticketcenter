import { Injectable } from '@angular/core';
import {Status} from '../models/status.model';
import 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { Summary } from 'src/app/dashboard/summary.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  statusList:Status[];
  
  statusSummaryList:Summary[] = [];
  status:Status;

  //observe when list change
  statusChanged = new Subject<Status[]>();

  constructor(private apiService:ApiService,
    ) { }

  getStatus(){
    return this.apiService.get('status').pipe(map((data : any)=> 
    {  
      return data as Status[]
     }))
   }

    getStatusSummary(){
      return  this.apiService.get('status/summary').pipe(map((data:any)=>{
          return data as Summary[]
      }))

    }
    
  updateStatus(status:Status){
    return this.apiService.put("status/updatestatus",status).pipe(map(res => res.json()));
  }

  //get the first one => x[0]
  getStatusById(id:number){
      this.apiService.get('status/'+ id).pipe(map((data:any)=>{
          return data.json() as Status[] 
      } ));
    }

    
    deleteStatusById(id:number){
     return this.apiService.delete('status/'+ id).pipe(map((data:any)=>{
       return data.json() as Status[];
     }))
    }

  addStatus(status:Status){
      var body = JSON.stringify(status);
      console.log(body);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.apiService.post('status',status).pipe(map(x => x.json())); 

    }

}
