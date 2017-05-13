import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  ActivatedRoute, Router, Params, ActivatedRouteSnapshot, provideRoutes } from '@angular/router';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup;
  constructor(private _builder: FormBuilder, private _router: Router, private _http:HttpService, private _activroute : ActivatedRoute) { 
    let a = this._activroute.snapshot.data;
   console.log(a);
  }

  ngOnInit() {
    this.login = this._builder.group({
       EmailId : [' ', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
       Password : ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }
  formSubmit(value, valid){
      if(valid){
        this._http.loginAuth(value).subscribe(res=> { res});
      }
  }

}
