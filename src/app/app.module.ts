import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TicketComponent } from './ticket/ticket.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';

import { AdmincenterComponent } from './admin/admincenter.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { TechnicianComponent } from './technician/technician.component';
import { HttpModule} from '@angular/http';
import { ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule } from '@angular/forms';
import { TicketStatusPipe } from './ticket/ticket-status.pipe';
import { UserTechnicianPipe } from './user/user-technician.pipe';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { AppMaterialModule } from './app-material/app-material.module';
import { AuthModule } from './auth/auth.module';
import { TechnicianModule } from './technician/technician.module';
import { TicketModule } from './ticket/ticket.module';
import { ChatModule } from './chat/chat.module';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
   AdmincenterComponent,
   UserEditComponent,
   TicketStatusPipe,
   UserTechnicianPipe
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
   
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    CoreModule,
    SharedModule,
    DashboardModule,
    HomeModule,
    AdminModule,
    AppMaterialModule,
    AuthModule,
    TechnicianModule,
    TicketModule,
    ChatModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
