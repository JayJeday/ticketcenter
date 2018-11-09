import { NgModule } from "@angular/core";
import {Routes, RouterModule, PreloadAllModules} from "@angular/router";
import { AuthGuard } from "./auth/authorization/auth.guard";


const routes: Routes = [
  
    {
      path: 'home',
      loadChildren: './home/home.module#HomeModule'
    },
    {
      path: 'dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule',
      canActivate:[AuthGuard]
    },
    {
      path: 'admin',
      loadChildren: './admin/admin.module#AdminModule',
      canActivate:[AuthGuard]
    },
    {
      path: 'technician',
      loadChildren: './technician/technician.module#TechnicianModule',
      canActivate:[AuthGuard]
    },
    {
      path: 'ticket',
      loadChildren: './ticket/ticket.module#TicketModule',
      canActivate:[AuthGuard]
    },
   {
      path:'chat',
      loadChildren:'./chat/chat.module#ChatModule',
      canActivate:[AuthGuard]
   },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }
     
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}