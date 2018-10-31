export class User {
    id:number;
    FirstName:string;
    LastName:string;
    Password:string;
    Email:string;
    isActivate:boolean;
    isLocked:boolean;
    Role:string;
    CategoryDesc:string;
    CategoryId:number;
    RoleId:number;
    techId:number;
    RegisterDate:string;
    AdminId:number;
    CreatedDate:string
    

    //token info
    aRoleId:string;
    access_token:string;
    token_type:string;
    aId:string;
    ClientId:string;
    aEmpId:number;
   
    UserId:number;
    TotalCount:number;
}