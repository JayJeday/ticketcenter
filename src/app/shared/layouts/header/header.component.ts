import { Component, OnInit, Input,Inject } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../../../core/models/user.model';
import { LoginComponent } from '../../../auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()logged:boolean;
  user:User;


  constructor(private auth:AuthenticationService,
    public dialog: MatDialog) { }

  ngOnInit() {

  }
 
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '300px',
  width: '600px'
    });

  }


  logout(){
   this.auth.logout();
  }
}
