import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  message;
  constructor(private _router: Router) { 
  }

  ngOnInit() {
    let email =     localStorage.getItem('email');
   
    if(email !== 'true'){
       this._router.navigate(['login']);  
    }
    else{
       this.message = localStorage.getItem('message');
    }
  }
  ngAfterContentInit(){
    localStorage.clear();
  }

}
