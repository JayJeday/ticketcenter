import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

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
  constructor() { }

  ngOnInit() {
  }

}
