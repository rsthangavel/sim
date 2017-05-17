import { Injectable } from '@angular/core';
import{ Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
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
  .map(res=>{ return res.json();});
} 
 registerAuth(value){
     const header =  new Headers();
   console.log(value.EmailId);
  header.append('Content-Type', 'application/x-www-form-urlencoded'); 
  header.append('Authorization', 'Bearer'+ 'JWT');
  let data = 'EmailId='+value.EmailId+ '&Gender='+ value.Gender+ '&DOB='+value.DOB+'&Password='+value.passgroup.Password;
  return this._http.post('http://localhost:2000/api/register', data,{headers: header})
  .map(res=>{ return res.json();});
} 
  getContact(value){
    let user = localStorage.getItem('currentuser_success');
    let token = localStorage.getItem('currentuser_token');
  
    const header =  new Headers();
      header.append('Content-Type', 'application/x-www-form-urlencoded'); 
  header.append('Authorization', 'Bearer'+' '+ 'JWT'+ ' '+ token);
   return this._http.post('http://localhost:2000/api/getDetails',{headers: header})
  .map(res=>{ return res.json();});

  
  }
  getDetails(){
      let user = localStorage.getItem('currentuser_success');
    let token = localStorage.getItem('currentuser_token');
    const header =  new Headers();
      header.append('Content-Type', 'application/x-www-form-urlencoded'); 
  header.append('Authorization', token);
   return this._http.post('http://localhost:2000/api/getDetails',{headers: header})
  .map(res=>{ return res.json();});
  }
  isLoggedIn(){
     let user = localStorage.getItem('currentuser_success');
    let token = localStorage.getItem('currentuser_token');
    let data=true;
    const header =  new Headers();
      header.append('Content-Type', 'application/x-www-form-urlencoded'); 
   header.append('Authorization', token);
   return this._http.post('http://localhost:2000/api/refresh_token',data,{headers: header});
  //.map(res=>  res.json())
   
  }

}
