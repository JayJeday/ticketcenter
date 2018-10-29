import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-categorydetail',
  templateUrl: './categorydetail.component.html',
  styleUrls: ['./categorydetail.component.css']
})
export class CategorydetailComponent implements OnInit {

  category: Category;
  categoryDesc: string;

  id:number;

  loading = false;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private categoryService:CategoriesService
    ) { }

  ngOnInit() {

    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
         this.categoryService.getCategoryById(this.id);
         console.log("category is called");
      }
    );
  }

update(){
  //call service  to update category here
  this.loading = true;
  this.categoryService.updateCategory(this.categoryService.category)
     .subscribe(data => {
        this.loading = false;

        //notification of succesfully saved
        console.log("cat updated is called");
       //need to update list so it refresh it 
       this.categoryService.getCategories();
        //route back to list
        this.gotoCategoryList();
     });
 
}

delete(){
    
  //call service  to update category here
  this.loading = true;
  this.categoryService.deleteCategoryById(this.categoryService.category.CategoryId)
     .subscribe(data => {
        this.loading = false;

        //need to update list so it refresh it 
        this.categoryService.getCategories();
        //route back to list
        this.gotoCategoryList();
     });
 
}



cancel(){
  this.gotoCategoryList();

}

gotoCategoryList(){
  //go back
  //pass Value  to updated true activated message 
  this.router.navigate(['../../'], { relativeTo: this.route });
}
  
}
