import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  filteredType="technician";
  filteredProperty='';

  toogle:boolean = true;

  @Input()listType;

  constructor(private route:ActivatedRoute,private service:UsersService) { }

  ngOnInit() {
    //get all users by default
    this.service.getU();
    
    console.log(this.service.userList);
    
    console.log(this.listType);


    this.route.data.subscribe((data)=>{
       this.filteredProperty = data['prop'];
      
    });


  }

  onTicketRoleFilter(){
    //toggle
    if(this.toogle){
      //search for close
      this.filteredType = 'admin';
      this.toogle = !this.toogle;
    }else{
      this.filteredType = 'technician';
     this.toogle =  !this.toogle;
    }
  }
}
