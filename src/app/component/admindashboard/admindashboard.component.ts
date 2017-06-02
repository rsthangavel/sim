import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { ChatService } from '../../service/chat.service';
 
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  t: boolean = true;
  message = [];
  displayMessage = [];
  connection;

  constructor(private _activate: ActivatedRoute, private _http: HttpService, private _router: Router, private _chat: ChatService) { 
  
  
  }
sendMessage(){
  this._chat.sendMessages(this.message);
  let date = new Date();
  this.displayMessage.push({ Name:'Thangavel',text: this.message, Date: date });
  this.message = [];
}
  ngOnInit() {
    this.connection = this._chat.getMessages().subscribe(message =>{
      this.message.push(message);
    })
  }
  logout(){
    localStorage.clear();
    this._router.navigate(['login']);
  }
  ngOnDestory(){
    this.connection.unsubscibe();
  }

}
//http://embed.plnkr.co/SelQZh/ -> Youtube autocomplete api