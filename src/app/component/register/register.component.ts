import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from  '../../service/http.service';
import { DatePickerComponent } from 'ng2-date-picker';
import { Observable } from 'rxjs/Observable';

export function comparePassword(group: FormGroup) {
  const pass = group.value;
  return (pass.Password === pass.Confirm) ? null /* It's good */ : {
    invalid: true
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  error;
  loading:boolean = false;
  reg_button:boolean = true;
 
  @ViewChild('dayPicker') dayPicker: DatePickerComponent;
    
    open() {
        this.dayPicker.api.open();
    }
     
    close() {
         this.dayPicker.api.close();
    } 
  constructor(private _builder: FormBuilder, private _router: Router, private _http: HttpService) { 
   
  }

  ngOnInit() {
     this.register = this._builder.group({
       EmailId : [' ', Validators.compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])],
       Gender : ['', Validators.compose([Validators.required])],
       DOB : ['', Validators.compose([Validators.required]), this.user.bind(this)],
       passgroup : this._builder.group({
         Password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
       Confirm : ['', Validators.compose([Validators.required])]
    }, {validator : comparePassword})
     });
  }
  user(value) :Observable<boolean>{
    //console.log(value._value);
    if(!isNaN(value._value)){
    //return true;
    return Observable.of(true);
  }
  else{
    return Observable.of(false);
  } 
 }
 //dpDayPicker : IDatePickerConfig;
  formSubmit(value,valid){
       if(valid){
         this.loading = true;
         this.reg_button =false;
          this._http.registerAuth(value).subscribe(res=> {
          if(res.success == true){
    
            localStorage.setItem('email', res.success);
            localStorage.setItem('message', res.message);
              //this._router.navigate(['admin']); 
               //this.error = res.message;
               this._router.navigate(['register/email-verification']);
          }
          else if(res.success == false){
            this.loading = false;
            this.reg_button = true;
             this.error = res.message;
          }  
          });
        
       }
  }

}
