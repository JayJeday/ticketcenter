import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user:User;
  @Input() index:number;

  @Input() itemType:string;

  constructor() { }

  ngOnInit() {

    console.log(this.itemType)
  }

}
