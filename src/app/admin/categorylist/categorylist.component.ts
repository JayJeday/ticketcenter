import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {

  displayAddForm = false;
  categoryAdded:string;
  
  categoryList:Category[];

  loading = false;

  constructor(public categoryService:CategoriesService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((data:any)=>{
      this.categoryList = data;
    });
    
  }

  addCategory(){
    console.log(this.categoryAdded);
    var c;
    c.CategoryDesc = this.categoryAdded;
    this.loading = true;

    this.categoryService.addCategory(c).subscribe(data => {
      
      //update list
      this.categoryService.getCategories();
      //snackebar that notify list changed
      
   });

    //close button to add 
    this.displayAddForm =false;
  }

showForm(){
  this.displayAddForm =!this.displayAddForm;
}

}
