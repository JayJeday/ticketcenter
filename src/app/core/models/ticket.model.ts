export class Ticket{

    public id:number;
    public description:string;
    public comment:string;
    public createdDate:string;
    public categoryId:number;
    public statusId:number;

    //when the ticket first created
    constructor(description:string,categoryId:number){
        this.description = description;
        this.categoryId = categoryId;
    }
    
}