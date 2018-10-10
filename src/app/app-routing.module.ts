import { NgModule } from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AdmincenterComponent } from "./admincenter/admincenter.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TechnicianComponent } from "./technician/technician.component";

const appRoutes:Routes =[
   {
       path:'',
       redirectTo:'/home',
       pathMatch: 'full'
   },

    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'admincenter',
        component: AdmincenterComponent
    },
    {
        path:'dashboard',
        component: DashboardComponent
    },
    {
        path:'tech',
        component: TechnicianComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}