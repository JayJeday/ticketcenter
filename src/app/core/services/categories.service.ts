import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoryList:Category[];

  constructor(private http:Http) { }

  getCategories(){
    this.http.get('http://localhost:2175/api/category/getallcategories')
    .map(
      (data : Response) =>{  return data.json() as Category[]; })
    .toPromise().then(x => {
      this.categoryList = x;
    }).catch((x)=>'error was called');
  }
}
