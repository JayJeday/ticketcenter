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
import { PropcomponentComponent } from "./admincenter/propcomponent/propcomponent.component";
import { ManageUserComponent } from "./admincenter/manage-user/manage-user.component";
import { ManageTicketsComponent } from "./admincenter/manage-tickets/manage-tickets.component";
import { UserDetailComponent } from "./user/user-detail/user-detail.component";
import { AuthGuard } from "./core/authorization/auth.guard";
import { LoginComponent } from "./login/login.component";
import { CreateuserComponent } from "./admincenter/createuser/createuser.component";
import { ManageTechComponent } from "./admincenter/manage-tech/manage-tech.component";
import { TechCatComponent } from "./admincenter/manage-tech/tech-cat/tech-cat.component";

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
        canActivate:[AuthGuard],
        children:[

             {path:'tech', component: ManageTechComponent, children:[
            {path:':id', component: TechCatComponent}
             ]},
            {path:'create', component: CreateuserComponent},
            {path:'props', component:PropcomponentComponent, children:[
             {path:'status/:id', component: StatusdetailComponent, outlet: 'stat'},
            {path:'category/:id', component: CategorydetailComponent},
           
           

            ]},

            {path:'manage', component: ManageUserComponent, children:[
                {path:'role/:id',component:UserDetailComponent, outlet:'rol',data:{comp:'admin_role'}},
                {path:'category/:id',component:UserDetailComponent, outlet:'rol', data:{comp:'admin_cat'}}
            ] },

            {path:'tickets', component: ManageTicketsComponent, children:[

                  {path:':id', component: TicketDetailComponent,data:{comp:'admin'}}

            ] }

             
        ]
    },
    {
        path:'dashboard',
        component: DashboardComponent,
        canActivate:[AuthGuard],
        children:[
            {path:'ticket/:id', component: TicketDetailComponent,data:{comp:'dash'}}
        ]
    },
    {
        path:'tech/:id',
        component: TechnicianComponent,
        canActivate:[AuthGuard]
        ,children:[
            {path:'ticket/:id', component: TicketDetailComponent,data:{comp:'tech'}}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}