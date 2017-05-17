import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  ActivatedRoute, Router, Params, ActivatedRouteSnapshot, provideRoutes, NavigationStart } from '@angular/router';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup;
  error;
   loading:boolean = false;
  login_button:boolean = true;
  constructor(private _builder: FormBuilder, private _router: Router, private _http:HttpService, private _activroute : ActivatedRoute) { 
     let user = localStorage.getItem('currentuser_success');
    let token = localStorage.getItem('currentuser_token');
    let error = JSON.parse(localStorage.getItem('error'));
   console.log(token);
    if(user){
      if(token){
        this._router.navigate(['admin']); 
       }
    }
    else if(error){
      // console.log(error.message);
      this.error = error.message.message;
      localStorage.clear();
    }
   
    //let a = this._activroute.snapshot.data;
  }

  ngOnInit() {
    this.login = this._builder.group({
       EmailId : [' ', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
       Password : ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }
  formSubmit(value, valid){
      if(valid){
         this.loading = true;
         this.login_button =false;
        this._http.loginAuth(value).subscribe(res=> {
         
          if(res.success == true && res.token){
             this.loading = false;
        this.login_button = true;
            localStorage.setItem('currentuser_success', res.success);
            localStorage.setItem('currentuser_token', res.token);
              this._router.navigate(['admin']);   
          }
          else if(res.success == false && res.message){
             this.loading = false;
             this.login_button = true;
            this.error = res.message;
               
          }  
        },
        (err)=>{
           this.loading = false;
             this.login_button = true;
          this.error = err.json().message;
         
        });
        
      }
      else{
        this.loading = false;
        this.login_button = true;
      }
  }

}
