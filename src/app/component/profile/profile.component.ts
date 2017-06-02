import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  update: FormGroup;
  constructor(private _builder: FormBuilder) { }

  ngOnInit() {
      this.update = this._builder.group({
       FirstName : ['', Validators.compose([Validators.required])],
       LastName  : ['' , Validators.required],
       Gender : ['', Validators.compose([Validators.required])],
       DOB : ['', Validators.compose([Validators.required])],
     });
  }

}
