import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { StatusService } from 'src/app/core/services/status.service';
import { RolesService } from 'src/app/core/services/roles.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  userForm: FormGroup;

  loading = false;

  success = false;

  techEnabled = false;

  constructor(private userService:UsersService,
      private categoryService:CategoriesService,
      private statusService:StatusService,
      private roleService:RolesService
    ) { }

  ngOnInit() {
    this.categoryService.getCategories();
    this.statusService.getStatus();
    this.roleService.getRoles();

    this.userForm = new FormGroup({
      'FirstName': new FormControl('', [Validators.required]),
      'LastName': new FormControl(null, [Validators.required]),
      'RoleId': new FormControl(null, [Validators.required]),
      'CategoryId': new FormControl(null)
    });


  }

  setTech(value){
    if(value === 'technician'){
     this.techEnabled = true;
    } 
    }

  onCreatedUser(){
    this.loading = true;

    this.userService.createUser(this.userForm.value).subscribe(data => {
      this.loading  = false;
      this.success = true;
      //display notification
    },error =>{
      console.log(error);
    });

    
    this.loading = false;
  }

}
