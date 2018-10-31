import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesService } from './services/roles.service';
import { StatusService } from './services/status.service';
import { TicketService } from './services/ticket.service';
import { UsersService } from './services/users.service';
import { CategoriesService } from './services/categories.service';
import { AuthenticationService } from './services/authentication.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './Interceptors/error.interceptor';
import { JwtInterceptor } from './Interceptors/jwt.Interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    RolesService,
    StatusService,
    TicketService,
    UsersService,
    CategoriesService,
    AuthenticationService
  ],
  declarations: []
})
export class CoreModule { }
