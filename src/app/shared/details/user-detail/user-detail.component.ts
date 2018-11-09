import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { RolesService } from 'src/app/core/services/roles.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material';
import { Category } from 'src/app/core/models/category.model';
import { Role } from 'src/app/core/models/rode.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  loading = false;
  id:number;

  categories:Category[];
  roles:Role[];

  userWithRole:User = {} as User;

  user:User;

  userForm:FormGroup;
  
  //to display spasific UI element based on the route is called
  comp:string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService:UsersService,
    private roleService: RolesService,
    
    private fb:FormBuilder,
    
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {

    this.roleService.getRoles().subscribe((data)=>{
      this.roles = data;
    });

   this.usersService.getUserRoleById(this.data.id).subscribe((data)=>{
      this.userWithRole = data[0];
   });


    //get the data of routes
    this.route.data
    .subscribe((data)=>{
      this.comp = data['comp'];
    });

  }

  onUserUpdate(form:NgForm){

    this.loading = true;

    this.user.id = this.userWithRole.UserId;
     this.user.RoleId = form.value.RoleId;
     this.user.FirstName = this.userWithRole.FirstName;
     this.user.LastName = this.userWithRole.LastName;


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
