import { Injectable } from '@angular/core';
import{ Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 const url =window.location.origin;
 
@Injectable()
export class HttpService {
  
  constructor(private _http:Http) { }
  loginAuth(value){
     const header =  new Headers();
   console.log(value.EmailId);
  header.append('Content-Type', 'application/x-www-form-urlencoded'); 
  header.append('Authorization', 'Bearer'+ 'JWT');
  let data = 'EmailId='+value.EmailId+'&Password='+value.Password;
  return this._http.post('http://localhost:2000/api/login', data,{headers: header})
  .map(res=>{});
} 
  getContact(value){
     return { id: value, details:'Test'};
  }
  isLoggedIn(){
     const header =  new Headers();
       header.append('Content-Type', 'application/x-www-form-urlencoded');
       return this._http.post('http://localhost:2000/api/get-detail',{headers:header}).map(res=>{});
     
    
   
  }

}
