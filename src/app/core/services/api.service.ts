
import { throwError, Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

//represent CRUD Operations in API at high level
export class ApiService{

    constructor(private http:HttpClient){}

    private formatErrors(error: any) {
        return  throwError(error.error);
      }

//Insert
post(path: string, body: Object = {}): Observable<any> {

    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})

    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body), {headers: headers})
      .pipe(catchError(this.formatErrors));
  }

//Delete
delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`)
      .pipe(catchError(this.formatErrors));
  }

//Update
put(path: string, body: Object = {}):Observable<any>{

    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    
    return this.http.put(`${environment.api_url}${path}`,
        JSON.stringify(body),{headers:headers})
        .pipe(catchError(this.formatErrors));
}

//Get
get(path:string,params: HttpParams = new HttpParams()):Observable<any>{  
    return this.http.get(`${environment.api_url}${path}`, { params })
    .pipe(catchError(this.formatErrors));
    }

}