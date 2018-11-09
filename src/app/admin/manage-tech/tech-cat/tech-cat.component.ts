import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-tech-cat',
  templateUrl: './tech-cat.component.html',
  styleUrls: ['./tech-cat.component.css']
})
export class TechCatComponent implements OnInit {

  loading = false;
  id:number;

  categoryList:Category[];
  
  user:User = {} as User;

  tech:User = {} as User;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public usersService:UsersService,
    public categoryService:CategoriesService,
    
    private fb:FormBuilder,
    
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TechCatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {

    this.categoryService.getCategories().subscribe((data)=>{
        this.categoryList = data;
    });

     this.usersService.getUserById(this.data.id).subscribe((data)=>{
        this.tech = data[0];
     });

  }

  onTechUpdate(form:NgForm){

    //****TODO Better solution than this */
    this.loading = true;

    this.user.UserId = this.tech.UserId;
    
    this.user.CategoryId = form.value.CategoryId;
  
    console.log(JSON.stringify(this.user));

    //pass back the same ticket
    this.usersService.updateTechCat(this.user)
     .subscribe(data => {

        this.loading = false;
       this.usersService.getTechs();

       this.categoryService.categoryChanged.next(true);
       this.dialogRef.close();
       this.snackBar.open("Updated successfully",'', {
        duration: 1000
      });

     });

    this.loading = false;
  }

}
