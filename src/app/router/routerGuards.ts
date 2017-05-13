import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { HttpService } from '../service/http.service';

@Injectable()
export class RouterGuards implements CanActivate{
  private can:boolean = false;
  constructor(private auth: AuthService){}
  canActivate() : boolean {
      //console.log(this.auth.isLoggerIn());
    return this.auth.isLoggedIn();
  }

 
}