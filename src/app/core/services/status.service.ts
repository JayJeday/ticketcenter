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
    private http:Http
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

    var body = JSON.stringify(status);
    console.log(body);
    var headerOptions = new Headers({ 'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put("http://localhost:2175/api/status/updatestatus",
      body,
      requestOptions).map(res => res.json());
  }

    getStatusById(id:number){
      this.http.get('http://localhost:2175/api/status/'+ id)
      .map(
        (data : Response) =>{  return data.json() as Status[] })
      .toPromise().then(x => {
        this.status = x[0];
      }).catch((x)=>'error was called');
    }

    deleteStatusById(id:number){
     return this.http.delete('http://localhost:2175/api/status/'+ id)
      .map(
        (data : Response) =>{  return data.json() as Status[] });
    }



  addStatus(status:Status){
      var body = JSON.stringify(status);
      console.log(body);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.http.post('http://localhost:2175/api/status',body,requestOptions).map(x => x.json());

    }

}
