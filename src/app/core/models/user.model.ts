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

    //token info
    aRoleId:string;
    access_token:string;
    token_type:string;
    aId:string;
    ClientId:string;

    UserId:number;

}