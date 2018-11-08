import { NumberValueAccessor } from "@angular/forms/src/directives";

export interface Ticket{

         TicketId:number;
         Description:string;
         Comment:string;
         CreatedDate:string;
         CategoryId:number;
         CategoryDesc:string;
         StatusDesc:string;
         StatusId:number;
         TechId:number;
         TechName:string;
         RolesId:number;

         ClientId:number;
     

    //pagination
         pageIndex:number;
         pageSize:number;
         TotalCount:number;
}