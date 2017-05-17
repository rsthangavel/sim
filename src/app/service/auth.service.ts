import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  routing:boolean = true;
  constructor(private _http: HttpService, private _router: Router) { }
  isLoggedIn() : boolean{
    
    if(localStorage.getItem('currentuser_message') && localStorage.getItem('currentuser_token')){
       return false;
    }
    else{  
      this._router.navigate(['login']);
      return true;
     
    }
  }
}
