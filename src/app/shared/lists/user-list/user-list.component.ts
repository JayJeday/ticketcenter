import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { MatSort, MatDialog, MatTableDataSource, PageEvent } from '@angular/material';
import { UserDetailComponent } from '../../details/user-detail/user-detail.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  filteredType="technician";
  filteredProperty='';

  users:User[] = [];
  toogle:boolean = true;

  pageEvent: PageEvent;

  displayedColumns: string[] = ['Id', 'FirstName', 'LastName','Role', 
  'CreatedDate','actions'];
  @ViewChild(MatSort) sort: MatSort;


  userData: MatTableDataSource<any>;

  @Input()listType;

  constructor(private route:ActivatedRoute,private service:UsersService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {

    this.route.data.subscribe((data)=>{
       this.filteredProperty = data['prop'];
      
    });

    this.service.getU().subscribe((data)=>{
      this.users = data;
       this.userData = new MatTableDataSource(this.users);
       this.userData.sort = this.sort;
    });

    //update list 
    this.service.roleChanged.subscribe((changed)=>{

      this.service.getU().subscribe((data)=>{
        this.users = data;
         this.userData = new MatTableDataSource(this.users);
      });
    });

  }

  onEdit(row){
    const dialogRef = this.dialog.open(UserDetailComponent, {
       width: '60%',
       data:{id:row}
    });
  }

  handlePage($event){
    
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
