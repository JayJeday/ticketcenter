import { Injectable } from '@angular/core';
import {Status} from '../models/status.model';
import 'rxjs/Rx';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Subject } from 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  statusList:Status[];
  
  status:Status;

  //observe when list change
  statusChanged = new Subject<Status[]>();

  constructor(private http:Http) { }

  getStatus(){
    this.http.get('http://localhost:2175/api/status')
    .map(
      (data : Response) =>{  return data.json() as Status[]; })
    .toPromise().then(x => {
      this.statusList = x;
    }).catch((x)=>'error was called');

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


  addStatus(status:Status){
      var body = JSON.stringify(status);
      console.log(body);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.http.post('http://localhost:2175/api/status',body,requestOptions).map(x => x.json());

    }
}
