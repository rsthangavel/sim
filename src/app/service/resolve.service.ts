import { Injectable } from '@angular/core';
import { HttpService } from './http.service'; 
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class ResolveService {

  constructor(private _http:HttpService, private _router:Router) { }
  resolve(route: ActivatedRouteSnapshot){
     if(!isNaN(route.params['id']) && route.params['id']>0){

        return this._http.getContact(route.params['id']);
  }
  else{
     this._router.navigate(['register']);
  }
}
}
