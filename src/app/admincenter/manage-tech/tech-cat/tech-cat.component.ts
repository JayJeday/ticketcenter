import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tech-cat',
  templateUrl: './tech-cat.component.html',
  styleUrls: ['./tech-cat.component.css']
})
export class TechCatComponent implements OnInit {

  loading = false;
  id:number;

  user:User;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private usersService:UsersService,
    private categoryService:CategoriesService,
    private fb:FormBuilder,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit() {

    this.categoryService.getCategories();

    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];

        this.usersService.getUserById(this.id);
        
      }
    );


  }

  onTechUpdate(form:NgForm){


    this.loading = true;

    this.user = new User();
    this.user.UserId = this.usersService.user.id;
        
    this.user.CategoryId = form.value.CategoryId;
  
    console.log(JSON.stringify(this.user));

    //pass back the same ticket
    this.usersService.updateTechCat(this.user)
     .subscribe(data => {
        this.loading = false;
       this.usersService.getTechs();
       
       this.snackBar.open("Updated successfully",'', {
        duration: 1000
      });

     });

    this.loading = false;
  }

}
