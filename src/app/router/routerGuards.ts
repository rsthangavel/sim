import { CanActivate, ActivatedRoute, Params, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpService } from '../service/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class RouterGuards implements CanActivate{
  private can:boolean = false;
  test;
  error;
  constructor(private auth: AuthService, private _router:Router, private _http:HttpService){
    
    if(!(localStorage.getItem('currentuser_success') && localStorage.getItem('currentuser_token'))){
     this._router.navigate(['login']);
  }
  }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>{
    
    
      
        return this._http.isLoggedIn().map(
          (res) =>{
            this.test = res.json();
               console.log(this.test.token);
               if(this.test.success && this.test.token){
                    localStorage.setItem('currentuser_success', this.test.success);
                    localStorage.setItem('currentuser_token', this.test.token); 
                      return true;                     
               }
               else{
                // throw new Error('Invalid');
                   this._router.navigate(['login']);
                   return false;
              }
          }
        )._catch((err) => {
          //console.log(err); 
          this.error = err.json();
          //console.log(this.error);
          //console.log(this.error.message);
          localStorage.clear();
          localStorage.setItem('error',JSON.stringify({message:this.error.message}));
          this._router.navigate(['login']);
           return Observable.of(false)});
      
       }
  
}