import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private _http: HttpService, private _router: Router) { }
  isLoggedIn(){
    if(localStorage.getItem('currentuser')){
      alert('1');
         this._http.isLoggedIn().subscribe(res=>{ return true;});
         return true;
    }
    else{
     
      this._router.navigate(['login/2']);
      return true;
    }
  }
}
