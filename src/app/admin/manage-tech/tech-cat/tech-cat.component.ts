import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    public usersService:UsersService,
    public categoryService:CategoriesService,
    private fb:FormBuilder,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TechCatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {

    this.categoryService.getCategories();

     this.usersService.getUserById(this.data.id);

  }

  onTechUpdate(form:NgForm){

    this.loading = true;

    this.user = new User();
    this.user.UserId = this.usersService.user.UserId;
    
    //verify if this work
    this.user.InChat = this.usersService.user.InChat;
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
