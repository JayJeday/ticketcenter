import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:Http) { }

  getCategories(){
    return this.http.get('http://localhost:2175/api/category/getallcategories')
    .map(response => response.json())
    .catch((error:any) => Observable.throw({
      message: error.json().message, details: error.json().details
    }));

    
  }
}
