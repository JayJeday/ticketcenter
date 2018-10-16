import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-categorydetail',
  templateUrl: './categorydetail.component.html',
  styleUrls: ['./categorydetail.component.css']
})
export class CategorydetailComponent implements OnInit {

  category: Category;
  categoryDesc: string;

  loading = false;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private categoryService:CategoriesService
    ) { }

  ngOnInit() {

    this.route.data
      .subscribe((c:Category) => {
        this.categoryDesc = c.Category1;
      });

  }

update(){
  this.category.Category1 = this.categoryDesc;
  //call service  to update category here
  this.loading = true;
  this.categoryService.updateCategory( this.category)
     .subscribe(data => {
        this.loading = false;

        //notification of succesfully saved

       //need to update list so it refresh it 

        //route back to list
        this.gotoCategoryList();
     });
 
}


cancel(){


}

gotoCategoryList(){
  //go back
  //pass Value  to updated true activated message 
  this.router.navigate(['../',{ updated: true }], { relativeTo: this.route });
}
  
}
