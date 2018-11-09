import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { StatusService } from 'src/app/core/services/status.service';
import { RolesService } from 'src/app/core/services/roles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Role } from 'src/app/core/models/rode.model';
import { Category } from 'src/app/core/models/category.model';
import { Status } from 'src/app/core/models/status.model';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  userForm: FormGroup;

  loading = false;

  success = false;

  techDisable = true;

  selectedValue:string;

  roles:Role[];
  categories:Category[];
  status:Status[];

  constructor(private userService:UsersService,
      public categoryService:CategoriesService,
      public statusService:StatusService,
      public roleService:RolesService
    ) { }

  ngOnInit() {
    let categoryO = this.categoryService.getCategories();
    let statusO = this.statusService.getStatus();
    let roleO = this.roleService.getRoles();

    forkJoin(categoryO,statusO,roleO).subscribe((results)=>{
      
      this.categories = results[0];
      this.status = results[1];
      this.roles = results[2];

    });

    this.userForm = new FormGroup({
      'FirstName': new FormControl('', [Validators.required]),
      'LastName': new FormControl(null, [Validators.required]),
      'RoleId': new FormControl(null, [Validators.required]),
      'Email': new FormControl(null,[Validators.required,Validators.email]),
      'CategoryId': new FormControl()
    });


  }

  get f() { return this.userForm.controls; }


  setTech(value){
    //is technician
    if(value === 1){
      this.techDisable = false;
    } else{
      this.techDisable = true;
      //empty mat select value
      this.selectedValue = undefined;
    }
    }

  onCreatedUser(){
    this.loading = true;

    this.userService.createEmployee(this.userForm.value).subscribe(data => {
      this.loading  = false;
      this.success = true;
      console.log(data);
    },error =>{
      console.log(error);
    });

    this.loading = false;
  }

}
