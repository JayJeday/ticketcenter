import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  filteredType="technician";
  filteredProperty='';

  toogle:boolean = true;

  users:User[] = [

{
  FirstName:'Test',
  LastName:'Test',
  Email:'test@email.com',
  Password:'password',
  isActivate:false,
  isLocked:false,
  role:'admin'
},
{
  FirstName:'Test2',
  LastName:'Test2',
  Email:'tes2t@email.com',
  Password:'password2',
  isActivate:false,
  isLocked:false,
  role:'technician'
},
{
  FirstName:'Test3',
  LastName:'Test3',
  Email:'test3@email.com',
  Password:'password3',
  isActivate:false,
  isLocked:false,
  role:'technician'
},





  ]
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {

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
