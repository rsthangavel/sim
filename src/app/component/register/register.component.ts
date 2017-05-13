import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup
  constructor(private _builder: FormBuilder, private _router: Router) { }

  ngOnInit() {
     this.register = this._builder.group({
       EmailId : [' ', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
       Gender : ['', Validators.compose([Validators.required])],
       DOB : ['', Validators.compose([Validators.required])],
       Country : ['', Validators.compose([Validators.required])],
       City : ['', Validators.compose([Validators.required])],
       Password : ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }
  formSubmit(value,valid){

  }

}
