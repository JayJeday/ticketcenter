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

  loading = false;

  constructor(private categoryService:CategoriesService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.categoryService.getCategories();
  }

  addCategory(){
    console.log(this.categoryAdded);
    var c = new Category();
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
