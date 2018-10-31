import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TechnicianComponent } from "./technician.component";
import { TicketDetailComponent } from "../shared/details/ticket-detail/ticket-detail.component";

const routes: Routes = [
    {
      path: 'technician/:id',
      component: TechnicianComponent,children:[
          {path:'ticket/:id', component: TicketDetailComponent,data:{comp:'tech'}}
      ]
    }
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class TechnicianRoutingModule{

}