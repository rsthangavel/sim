import { Injectable } from '@angular/core';
import{ Http, Headers } from '@angular/http';
import * as CryptoJS from 'crypto-js';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
 const url =window.location.origin;
 const salt = 10;
@Injectable()
export class HttpService {
  //private homeUrl = 'http://localhost:2000/';
   private homeUrl = 'https://angular-exp.herokuapp.com/';
  constructor(private _http:Http) { }
  loginAuth(value){
    
     const header =  new Headers();
   console.log(value.EmailId);
  header.append('Content-Type', 'application/x-www-form-urlencoded'); 
  header.append('Authorization', 'Bearer'+ 'JWT');
  let data = 'EmailId='+value.EmailId+'&Password='+value.Password;
  return this._http.post(this.homeUrl+'api/login', data,{headers: header})
  .map(res=>{ return res.json();});
} 

 registerAuth(value){
     const header =  new Headers();
  header.append('Content-Type', 'application/x-www-form-urlencoded'); 
  header.append('Authorization', 'Bearer'+ 'JWT');
  let data = 'EmailId='+value.EmailId+ '&Gender='+ value.Gender+ '&DOB='+value.DOB+'&Password='+value.passgroup.Password;
  return this._http.post(this.homeUrl+'api/register', data,{headers: header})
  .map(res=>{ return res.json();});
} 
  getContact(value){
    let user = localStorage.getItem('currentuser_success');
    let token = localStorage.getItem('currentuser_token');
  
    const header =  new Headers();
      header.append('Content-Type', 'application/x-www-form-urlencoded'); 
  header.append('Authorization', 'Bearer'+' '+ 'JWT'+ ' '+ token);
   return this._http.post(this.homeUrl+'api/getDetails',{headers: header})
  .map(res=>{ return res.json();});

  
  }
  getDetails(){
      let user = localStorage.getItem('currentuser_success');
    let token = localStorage.getItem('currentuser_token');
        var data1 = CryptoJS.AES.decrypt(token, 'secret');
     var token1 = data1.toString(CryptoJS.enc.Utf8);
    const header =  new Headers();
      header.append('Content-Type', 'application/x-www-form-urlencoded'); 
  header.append('Authorization', token1);
   return this._http.post(this.homeUrl+'api/getDetails',{headers: header})
  .map(res=>{ return res.json();});
  }
  isLoggedIn(){
     let user = localStorage.getItem('currentuser_success');
    let token = localStorage.getItem('currentuser_token');
     var data1 = CryptoJS.AES.decrypt(token, 'secret');
     var token1 = data1.toString(CryptoJS.enc.Utf8);
    let data=true;
    const header =  new Headers();
      header.append('Content-Type', 'application/x-www-form-urlencoded'); 
   header.append('Authorization', token1);
   return this._http.post(this.homeUrl+'api/refresh_token',data,{headers: header});
  //.map(res=>  res.json())
   
}
imageupload(file, profile){
      const header =  new Headers();
        let formData:FormData = new FormData();
      
        formData.append('uploadFile', file, file.name);
        //formData.append('data', profile);
    
         let user = localStorage.getItem('currentuser_success');
    let token = localStorage.getItem('currentuser_token');
       var data1 = CryptoJS.AES.decrypt(token, 'secret');
     var token1 = data1.toString(CryptoJS.enc.Utf8);
       header.append('Authorization', token1);
        header.append('Accept', 'application/json');
        //let data = 'image='+formdata+'&path='+profile;
      //  console.log(data);
      if(profile == 'header'){
      return this._http.post(this.homeUrl+'api/user/image-upload-header', formData,{headers: header})
  .map(res=>{ return res.json();});
      }
      else{
         return this._http.post(this.homeUrl+'api/user/image-upload-profile', formData,{headers: header})
  .map(res=>{ return res.json();});
      }
}
profile_info(value){
   const header =  new Headers();
    let user = localStorage.getItem('currentuser_success');
    let token = localStorage.getItem('currentuser_token');
       var data1 = CryptoJS.AES.decrypt(token, 'secret');
     var token1 = data1.toString(CryptoJS.enc.Utf8);
       header.append('Authorization', token1);
        header.append('Accept', 'application/json');
         header.append('Content-Type', 'application/x-www-form-urlencoded'); 
 let data = 'first_name='+value.First+ '&last_name='+ value.Last+ '&mobile='+value.Mobile+'&address='+value.Address;
      return this._http.post(this.homeUrl+'api/user/profile_info', data ,{headers: header})
  .map(res=>{ return res.json();});
}
getimage(){
  const header =  new Headers();
    let user = localStorage.getItem('currentuser_success');
    let token = localStorage.getItem('currentuser_token');
       var data1 = CryptoJS.AES.decrypt(token, 'secret');
     var token1 = data1.toString(CryptoJS.enc.Utf8);
       header.append('Authorization', token1);
        header.append('Content-Type', 'multipart/form-data');
        header.append('Accept', 'application/json');

      return this._http.post(this.homeUrl+'api/user/get-profile', 'success',{headers: header})
  .map(res=>{ return res.json();});
}

}
