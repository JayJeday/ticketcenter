import { NumberValueAccessor } from "@angular/forms/src/directives";

export class Ticket{

   public TicketId:number;
    public Description:string;
    public Comment:string;
    public CreatedDate:string;
    public CategoryId:number;
    public CategoryDesc:string;
    public StatusDesc:string;
    public StatusId:number;
    public TechId:number;
    public TechName:string;
    public RolesId:number;

    public ClientId:number;
     

    //pagination
    public pageIndex:number;
    public pageSize:number;
    public TotalCount:number;
}