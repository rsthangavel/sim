import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../service/chat.service';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {
  @Input() messages = [];
  now = new Date();
  constructor(private _chat: ChatService) { }

  ngOnInit() {
   this._chat.getMessages().subscribe(message =>{
      this.messages.push(message);
    })
  }
  

}
