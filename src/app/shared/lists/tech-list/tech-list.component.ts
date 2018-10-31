import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { TechCatComponent } from '../../../admin/manage-tech/tech-cat/tech-cat.component';
import { User } from 'src/app/core/models/user.model';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-tech-list',
  templateUrl: './tech-list.component.html',
  styleUrls: ['./tech-list.component.css']
})
export class TechListComponent implements OnInit {

  @Input()listType;


  displayedColumns: string[] = ['Id', 'FirstName', 'LastName','Role', 
  'RegisterDate','CategoryDesc','actions'];
  @ViewChild(MatSort) sort: MatSort;

  techData: MatTableDataSource<any>;

  users:User[] = [];

  constructor(private userService:UsersService,
    private dialog: MatDialog,
    private categoryService:CategoriesService) { }

  ngOnInit() {

    if(this.listType === "assign"){
      this.userService.getTechs().subscribe((data)=>{
        this.users = data;
      });


    }



    if(this.listType !== "assign"){

      this.userService.getTechs().subscribe((data)=>{
      this.users = data;
      this.techData = new MatTableDataSource(this.users);
      this.techData.sort = this.sort;
    });
    }
    

//update list
    this.categoryService.categoryChanged.subscribe((changed)=>{
      this.userService.getTechs().subscribe((data)=>{
        this.users = data;
        this.techData = new MatTableDataSource(this.users);
      });

    });
  }

  onEdit(row){
    const dialogRef = this.dialog.open(TechCatComponent, {
       width: '60%',
       data:{id:row}
    });
  }


}
