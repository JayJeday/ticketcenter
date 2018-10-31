import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { TechListComponent } from './lists/tech-list/tech-list.component';
import { TechItemComponent } from './lists/tech-list/tech-item/tech-item.component';
import { UserListComponent } from './lists/user-list/user-list.component';
import { UserItemComponent } from './lists/user-list/user-item/user-item.component';
import { TicketDetailComponent } from './details/ticket-detail/ticket-detail.component';
import { UserDetailComponent } from './details/user-detail/user-detail.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsignUserComponent } from '../admin/asign-user/asign-user.component';
import { AdminModule } from '../admin/admin.module';
import { TicketListComponent } from './lists/ticket-list/ticket-list.component';
import { TicketItemComponent } from './lists/ticket-list/ticket-item/ticket-item.component';

@NgModule({
  imports: [
    AppMaterialModule,
    RouterModule,
    FormsModule,
    CommonModule,
  ],exports:[
    HeaderComponent,
    TechListComponent,
    TechItemComponent,
    UserListComponent,
    UserItemComponent,
    TicketDetailComponent,
    UserDetailComponent,
    TicketListComponent,
    TicketItemComponent

  ],
  declarations: [
    HeaderComponent,
    TechListComponent,
    TechItemComponent,
    UserListComponent,
    UserItemComponent,
    TicketDetailComponent,
    UserDetailComponent,
    AsignUserComponent,
    TicketListComponent,
    TicketItemComponent
  ]
})
export class SharedModule { }
