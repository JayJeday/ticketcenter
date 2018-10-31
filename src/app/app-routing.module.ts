import { NgModule } from "@angular/core";
import {Routes, RouterModule, PreloadAllModules} from "@angular/router";
const routes: Routes = [
  
    {
      path: 'home',
      loadChildren: './home/home.module#HomeModule'
    },
    {
      path: 'dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
      path: 'admin',
      loadChildren: './admin/admin.module#AdminModule'
    },
    {
      path: 'technician',
      loadChildren: './technician/technician.module#TechnicianModule'
    },
    {
      path: 'ticket',
      loadChildren: './ticket/ticket.module#TicketModule'
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