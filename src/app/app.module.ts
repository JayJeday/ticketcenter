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

import { HttpClientModule } from '@angular/common/http'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

import {MatSidenavModule} from '@angular/material/sidenav';

import {MatPaginatorModule} from '@angular/material/paginator';

import { FormsModule } from '@angular/forms';
import { TicketStatusPipe } from './ticket/ticket-status.pipe';
import { UserTechnicianPipe } from './user/user-technician.pipe';
import { CategorylistComponent } from './admincenter/categorylist/categorylist.component';
import { StatuslistComponent } from './admincenter/statuslist/statuslist.component';
import { CategorydetailComponent } from './admincenter/categorydetail/categorydetail.component';
import { StatusdetailComponent } from './admincenter/statusdetail/statusdetail.component';
import { UsersService } from './core/services/users.service';
import { PropcomponentComponent } from './admincenter/propcomponent/propcomponent.component';
import { ManageUserComponent } from './admincenter/manage-user/manage-user.component';
import { ManageTicketsComponent } from './admincenter/manage-tickets/manage-tickets.component';
import { AsignUserComponent } from './admincenter/asign-user/asign-user.component';

import { ChartsModule } from 'ng2-charts';
import { AuthGuard } from './core/authorization/auth.guard';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';


import {MatRadioModule} from '@angular/material/radio';

import {MatTabsModule} from '@angular/material/tabs';
import { CreateuserComponent } from './admincenter/createuser/createuser.component';
import { TechListComponent } from './admincenter/manage-user/tech-list/tech-list.component';
import { ManageTechComponent } from './admincenter/manage-tech/manage-tech.component';
import { TechItemComponent } from './admincenter/manage-user/tech-list/tech-item/tech-item.component';
import { TechCatComponent } from './admincenter/manage-tech/tech-cat/tech-cat.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/Interceptors/jwt.Interceptor';
import { ErrorInterceptor } from './core/Interceptors/error.interceptor';
import { RegistrationComponent } from './registration/registration.component';
import { MatSortModule } from '@angular/material/sort';





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
   TicketAddComponent,
   UserEditComponent,
   TechnicianComponent,
   TicketItemComponent,
   TicketStatusPipe,
   UserTechnicianPipe,
   CategorylistComponent,
   StatuslistComponent,
   CategorydetailComponent,
   StatusdetailComponent,
   PropcomponentComponent,
   ManageUserComponent,
   ManageTicketsComponent,
   AsignUserComponent,
   LoginComponent,
   CreateuserComponent,
   TechListComponent,
   ManageTechComponent,
   TechItemComponent,
   TechCatComponent,
   RegistrationComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    ChartsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatRadioModule,
    HttpClientModule,
    MatTabsModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatSortModule
  ],
  providers: [TicketService,UsersService,CategoriesService,RolesService,AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  
  ],
  bootstrap: [AppComponent],
  entryComponents:[LoginComponent]
})
export class AppModule { }
