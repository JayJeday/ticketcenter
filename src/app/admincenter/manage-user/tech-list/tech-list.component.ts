import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-tech-list',
  templateUrl: './tech-list.component.html',
  styleUrls: ['./tech-list.component.css']
})
export class TechListComponent implements OnInit {

  @Input()listType;

  constructor(private userService:UsersService) { }

  ngOnInit() {

    this.userService.getTechs();
  }

}
