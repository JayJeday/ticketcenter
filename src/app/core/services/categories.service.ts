import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/Rx';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoryList:Category[];
  category:Category;

  constructor(private http:Http) { }

  getCategories(){
    this.http.get('http://localhost:2175/api/category/getallcategories')
    .map(
      (data : Response) =>{  return data.json() as Category[]; })
    .toPromise().then(x => {
      this.categoryList = x;
    }).catch((x)=>'error was called');

  }

  updateCategory(category:Category){

    var body = JSON.stringify(category);
    console.log(body);
    var headerOptions = new Headers({ 'Content-Type': 'application/json'});
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put("http://localhost:2175/api/category/updatecategory",
      body,
      requestOptions).map(res => res.json());
  }

  getCategoryById(id:number){
    this.http.get('http://localhost:2175/api/category/'+ id)
    .map(
      (data : Response) =>{  return data.json() as Category[] })
    .toPromise().then(x => {
      this.category = x[0];
    }).catch((x)=>'error was called');
    }
  
}
