import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/Rx';
import { Category } from '../models/category.model';
import { Summary } from 'src/app/dashboard/summary.model';
import { Subject } from 'rxjs/Rx';
;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoryList:Category[];
  category:Category;

  categoryChanged = new Subject();

  categorySummaryList:Summary[] = [];

  constructor(private http:Http) { }

  getCategories(){
    this.http.get('http://localhost:2175/api/category/all')
    .map(
      (data : Response) =>{  return data.json() as Category[]; })
    .toPromise().then(x => {
      this.categoryList = x;
    }).catch((x)=>'error was called');

  }

  deleteCategoryById(id:number){
   return this.http.delete('http://localhost:2175/api/category/'+ id)
    .map(
      (data : Response) =>{  return data.json() as Category[] });
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
  

    addCategory(category:Category){
      var body = JSON.stringify(category);
      console.log(body);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
      return this.http.post('http://localhost:2175/api/category',body,requestOptions).map(x => x.json());

    }

    getCategoriesSummary(){
      this.http.get('http://localhost:2175/api/category/summary')
      .map(
        (data : Response) =>{  return data.json() as Summary[]; })
      .toPromise().then(x => {
        this.categorySummaryList = x;
      }).catch((x)=>'error was called');
    }

}
