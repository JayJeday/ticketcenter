import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { Observable } from 'rxjs';

import * as socketIo from 'socket.io-client';

import { Event } from '../models/event';

//socket server
const SERVER_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  public initSocket(): void {
      this.socket = socketIo(SERVER_URL);
  }

  //emit message
  public send(message: Message): void {
      this.socket.emit('message', message);
  }

  //notificate the technician TODO pass id of tech
  public notify(notify:boolean):void{
        this.socket.emit('notify', notify);
  }

// listen when there is a message and get it
  public onMessage(): Observable<Message> {
      return new Observable<Message>(observer => {
          this.socket.on('message', (data: Message) => observer.next(data));
      });
  }

// listen to when  the tech is notified
  public onNotifyTech(): Observable<Boolean>{
      return new Observable<Boolean>((observer:any)=>{
        this.socket.on('notify', (data: Boolean) => observer.next(data));
      });
  }

  public onEvent(event:Event): Observable<any> {
      return new Observable<Event>(observer => {
          this.socket.on(event, () => observer.next());
      });
  }
  
}
