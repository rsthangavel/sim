import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import 'select2';
import 'bootstrap-daterangepicker';
import 'fullcalendar';
@Component({
  selector: 'app-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.css']
})
export class Select2Component implements OnInit {
  public _selectedFields: Array<string> = [];
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
     $('.chosen').daterangepicker({
          singleDatePicker: true,
       });
     $('.multi').select2();
      $('.multi').on(
            'change',
            (e) =>{
              this._selectedFields = [];
               //this.register.get('userselect').setValue(this._selectedFields)
              
              this._selectedFields.push($(e.target).val());
                    //this.register.get('userselect').setValue('')
              console.log(this._selectedFields[0]);
             // this.register.get('userselect').setValue(this._selectedFields)
              // this.register.get('userselect').reset();
            });
              $(".full").fullCalendar();
  }

}
