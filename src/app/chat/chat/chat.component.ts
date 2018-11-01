import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';



import { MatList, MatListItem, MatDialog } from '@angular/material';

import { SocketService } from '../shared/services/socket.service';
import { Action } from '../shared/models/action';

import { User } from '../../core/models/user.model';

import {Event} from '../shared/models/event';
import { Message } from '../shared/models/message.model';
import { UsersService } from 'src/app/core/services/users.service';

const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  //join, left, rename
  action = Action;
  
  currentUser: User;
  user:User;

  messages: Message[] = [];
  messageContent: string;

  ioConnection: any;

  // getting a reference to the overall list, which is the parent container of the list items
  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  // getting a reference to the items/messages within the list
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(private socketService: SocketService,
    private userService:UsersService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    //TODO::send the specific technician event that the client is in the room


    //set the current user from the token data
    this.initModel();
    
    // Using timeout due to https://github.com/angular/angular/issues/14748
    setTimeout(() => {

      this.sendNotification('user',Action.JOINED);
      
      //user is not a tech
      if(!this.currentUser.RoleId){
        //send notification to tech that a clients is waitng **Tech service
        this.socketService.notify(true);
      }

    }, 0);

    this.initIoConnection();
  }

  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  // auto-scroll fix: inspired by this stack overflow post
  // https://stackoverflow.com/questions/35232731/angular2-scroll-to-bottom-chat-style
  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  //pass model to chat
  private initModel(): void {
    const randomId = this.getRandomId();
   //set the user
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
    this.user = new User();
    this.user.id = this.currentUser.id;
    this.user.FirstName = this.currentUser.FirstName;
    this.user.LastName = this.currentUser.LastName;  
    this.user.avatar = `${AVATAR_URL}/${randomId}.png`;

  }

  //establish connection capture events
  private initIoConnection(): void {
    this.socketService.initSocket();

    //recive message
    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });


    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }

  //to display user info only for technician
  public onClickUserInfo() {

  }

  private openUserPopup(params): void {

  }

  //user send message 
  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message
    });

    this.messageContent = null;
  }

  //Send notification to the room when user do a specific action 
  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      }
    } else if (action === Action.LEFT) {
      message = {
        from: this.user,
        action: action, 
      }
    } else if(action === Action.TECH){
      message = {
        from: this.user,
        action: action
      }
    }
    //the message that emit
    this.socketService.send(message);
  }

}
