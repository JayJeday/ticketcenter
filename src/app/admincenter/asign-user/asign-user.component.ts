import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from 'src/app/core/models/ticket.model';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-asign-user',
  templateUrl: './asign-user.component.html',
  styleUrls: ['./asign-user.component.css']
})
export class AsignUserComponent implements OnInit {

  @Input() ticket:Ticket;

  searchInput:string;

  displayList = false;

  userType ="assign"; 

  userAssigned: User;
  constructor(private userService:UsersService) { }

  ngOnInit() {
    //get user of id if exist
    console.log("is called" + this.ticket);

    
    console.log(this.userService.user);

    this.userService.userChanged.subscribe((user:User)=>{
      //when user select user from the list
        this.userService.user = user;
        //update ticket id to user id
        this.ticket.TechId = this.userService.user.id;
        console.log(this.userService.user.id);
        this.displayList = false;
        
    });

  }

  ngOnChanges(){
    if(this.ticket.TechId !== null){
      //user with the ticket
    this.userService.getUserById(this.ticket.TechId);

    }

    
  }


  onChange(){
   this.displayList = !this.displayList;
  }

}
