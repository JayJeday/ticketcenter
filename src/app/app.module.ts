import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketListComponent } from './ticket/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './ticket/ticket-detail/ticket-detail.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserItemComponent } from './user/user-list/user-item/user-item.component';
import { AppRoutingModule } from './app-routing.module';

import {TicketService} from './core/services/ticket.service';
import {UserService} from './user/user.service';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmincenterComponent } from './admincenter/admincenter.component';
import { LoginComponent } from './login/login.component';
import { TicketAddComponent } from './ticket/ticket-add/ticket-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { CategoriesService } from './core/services/categories.service';
import { TechnicianComponent } from './technician/technician.component';
import { RolesService } from './core/services/roles.service';
import { TicketItemComponent } from './ticket/ticket-list/ticket-item/ticket-item.component';
import { HttpModule} from '@angular/http';
import { ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TicketComponent,
    TicketListComponent,
    TicketDetailComponent,
    UserComponent,
    UserListComponent,
    UserDetailComponent,
    UserItemComponent,
    HomeComponent,
    DashboardComponent,
   AdmincenterComponent,
   LoginComponent,
   TicketAddComponent,
   UserEditComponent,
   TechnicianComponent,
   TicketItemComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [TicketService,UserService,CategoriesService,RolesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
