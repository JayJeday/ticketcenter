
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { TicketComponent } from "./ticket.component";

const routes:Routes = [
    {
        path:'',
        component:TicketComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TicketRoutingModule{}