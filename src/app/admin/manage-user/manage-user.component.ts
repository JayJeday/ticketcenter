import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  roleType ="role";
  catType = "cat";
  
  constructor() { }

  ngOnInit() {
  }

}
