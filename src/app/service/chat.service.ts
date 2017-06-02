import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {
  private url = 'http://localhost:2000';
  private socket;
  constructor() { }
  sendMessages(message){
    this.socket.emit('add-message', message, 'Thangavel', new Date());
  }
  getMessages(){
    let observable = new Observable(observer =>{
      this.socket = io(this.url);
      this.socket.on('message', (data)=>{
        console.log(data);
        observer.next(data);
      });
      return() =>{
        this.socket.disconnet();
      };
    })
    return observable;
  }

}
