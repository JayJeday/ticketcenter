import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropcomponentComponent } from './propcomponent/propcomponent.component';
import { StatuslistComponent } from './statuslist/statuslist.component';
import { StatusdetailComponent } from './statusdetail/statusdetail.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageTicketsComponent } from './manage-tickets/manage-tickets.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { CategorydetailComponent } from './categorydetail/categorydetail.component';
import { AsignUserComponent } from './asign-user/asign-user.component';
import { TechCatComponent } from './manage-tech/tech-cat/tech-cat.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ManageTechComponent } from './manage-tech/manage-tech.component';


@NgModule({
  imports: [ 
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    AdminRoutingModule
    ],exports:[
  ],
  declarations: [
    PropcomponentComponent,
    StatuslistComponent,
    StatusdetailComponent,
    ManageUserComponent,
    ManageTicketsComponent,
    CreateuserComponent,
    CategorylistComponent,
    CategorydetailComponent,
    ManageTechComponent,
    TechCatComponent
  ]
})
export class AdminModule { }
