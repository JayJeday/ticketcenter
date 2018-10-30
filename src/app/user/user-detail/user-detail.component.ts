import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { RolesService } from 'src/app/core/services/roles.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  loading = false;
  id:number;

  user:User;

  userForm:FormGroup;
  
  //to display spasific UI element based on the route is called
  comp:string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService:UsersService,
    private roleService: RolesService,
    private categoryService:CategoriesService,
    private fb:FormBuilder,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {

    this.categoryService.getCategories();
    this.roleService.getRoles();

    this.usersService.getUserRoleById(this.data.id);

    //get the data of routes
    this.route.data
    .subscribe((data)=>{
      this.comp = data['comp'];
      console.log(this.comp);
    });

  }

  onUserUpdate(form:NgForm){

    this.loading = true;

    this.user = new User();
    this.user.id = this.usersService.user.UserId;
     this.user.RoleId = form.value.RoleId;
     this.user.FirstName = this.usersService.user.FirstName;
     this.user.LastName = this.usersService.user.LastName;


    console.log(JSON.stringify(this.user));

    //pass back the same ticket
    this.usersService.updateUser(this.user)
     .subscribe(data => {
        this.loading = false;
       
        this.usersService.roleChanged.next(true);
        this.dialogRef.close();
        this.snackBar.open("Updated successfully",'', {
          duration: 1000
        });


       this.usersService.getU();
       console.log("succesfull");
     });

    this.loading = false;

  }


}
