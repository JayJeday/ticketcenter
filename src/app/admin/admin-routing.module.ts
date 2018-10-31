import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateuserComponent } from './createuser/createuser.component';
import { PropcomponentComponent } from './propcomponent/propcomponent.component';
import { StatusdetailComponent } from './statusdetail/statusdetail.component';
import { CategorydetailComponent } from './categorydetail/categorydetail.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageTicketsComponent } from './manage-tickets/manage-tickets.component';
import { ManageTechComponent } from '../admin/manage-tech/manage-tech.component';
import { TechCatComponent } from '../admin/manage-tech/tech-cat/tech-cat.component';
import { AdmincenterComponent } from './admincenter.component';


const routes: Routes = [

    {
        path:'',
        component:AdmincenterComponent,children:[

     {
        path:'create',
        component: CreateuserComponent
    },
 
    {
        path:'tech', component: ManageTechComponent, children:[

        {path:':id', component: TechCatComponent}
        
    ]},

     {
         path:'props',
         component: PropcomponentComponent, children:[
            {path:'status/:id', component: StatusdetailComponent, outlet: 'stat'},
            {path:'category/:id', component: CategorydetailComponent},
          
           ]
        
        },
     
     {
        path:'manage',
        component: ManageUserComponent
     },
     {
         path:'tickets',
         component: ManageTicketsComponent
     }  

        ]
    },
   
  
]
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}