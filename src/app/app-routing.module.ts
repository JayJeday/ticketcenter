import { NgModule } from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AdmincenterComponent } from "./admincenter/admincenter.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TechnicianComponent } from "./technician/technician.component";
import { TicketDetailComponent } from "./ticket/ticket-detail/ticket-detail.component";
import { TicketListComponent } from "./ticket/ticket-list/ticket-list.component";
import { UserListComponent } from "./user/user-list/user-list.component";
import { StatusdetailComponent } from "./admincenter/statusdetail/statusdetail.component";
import { CategorydetailComponent } from "./admincenter/categorydetail/categorydetail.component";

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
        component: AdmincenterComponent,
        children:[
            {path:'tickets',component:TicketListComponent,data:{comp:'admin_status'}},
            {path:'technicians/categories',component:UserListComponent,data:{comp:'admin_cat'}},
            {path:'technician/role',component:UserListComponent,data:{comp:'admin_role'}},
            {path:':id', component: TicketDetailComponent,outlet: 'admin_detail'},


            {path:'status/:id', component: StatusdetailComponent},
            {path:'category/:id', component: CategorydetailComponent}
            
        ]
    },
    {
        path:'dashboard',
        component: DashboardComponent,
        children:[
            {path:'ticket/:id', component: TicketDetailComponent,data:{comp:'dash'}}
        ]
    },
    {
        path:'tech',
        component: TechnicianComponent
        ,children:[
            {path:'ticket/:id', component: TicketDetailComponent}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}