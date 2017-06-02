import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HttpService } from  '../../service/http.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';
import {Observable} from 'rxjs/Observable';
 import 'rxjs/add/operator/map';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-image-cropper';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  //output = 'assets/image/edit.png';
   @ViewChild('headercropper', undefined) headercropper:ImageCropperComponent;
   @ViewChild('profilecropper', undefined) profilecropper:ImageCropperComponent;
   @ViewChild('imagechange') el : ElementRef;
  data1:any;
  data2:any;
  cropperSettings1: CropperSettings;
  cropperSettings2: CropperSettings;
  header_profile = '';
  profile_pic = '';
  profile_details = {
    'first_name' : '',
    'last_name' : '',
    'mobile'  : '',
    'address' : ''

  };
   register: FormGroup;
   loading: boolean;
   sub_button;
   user_name;
   error;
   clickevent;
   success;
   data: boolean = true;
   data_content:string = "This is sample content";
   paragraph:Observable<boolean>; 
  constructor(private _http: HttpService, private _element: ElementRef, private _builder: FormBuilder, private ref:ChangeDetectorRef) {
        this.cropperSettings1 = new CropperSettings();
        this.cropperSettings1.width = 500;
        this.cropperSettings1.height = 500;

        this.cropperSettings1.croppedWidth = window.innerWidth;
        this.cropperSettings1.croppedHeight = 500;

        this.cropperSettings1.canvasWidth = 500;
        this.cropperSettings1.canvasHeight = 300;

        this.cropperSettings1.minWidth = 1000;
        this.cropperSettings1.minHeight = 1000;

        this.cropperSettings1.rounded = false;
         this.cropperSettings1.noFileInput = true;

        this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

        this.data1 = {}; 
          //Cropper settings 2
        this.cropperSettings2 = new CropperSettings();
        this.cropperSettings2.width = 200;
        this.cropperSettings2.height = 200;
        this.cropperSettings2.keepAspect = false;

        this.cropperSettings2.croppedWidth = 200;
        this.cropperSettings2.croppedHeight = 200;

        this.cropperSettings2.canvasWidth = 500;
        this.cropperSettings2.canvasHeight = 300;

        this.cropperSettings2.minWidth = 100;
        this.cropperSettings2.minHeight = 100;

        this.cropperSettings2.rounded = false;
        this.cropperSettings2.minWithRelativeToResolution = false;

        this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings2.noFileInput = true;

        this.data2 = {};
    this.paragraph = new Observable(observer=>{
       $(document).on('click', '.cmtedit', function (e) {
   
    observer.next(false);
 
});
    })
   let sub = this.paragraph.subscribe(res=>{
      this.data = false;
    });
 
  }
  ngAfterViewInit(){
 this.clickevent = Observable.fromEvent(this.el.nativeElement, 'click');
  
  }
  ngOnInit() {
    this._http.getimage().subscribe(res=>{
      console.log(res.message);
      if(res.success == "true"){
        if(res.message.profile_details.header_image){
               this.header_profile = '../uploads/'+res.message.profile_details.header_image.filename;
              
      }
      else{
         this.header_profile = 'http://lorempixel.com/850/280/nightlife/5/';
      }
      if(res.message.profile_details.profile_image){
                  this.profile_pic    = '../uploads/'+res.message.profile_details.profile_image.filename;
      }
      else{
         this.profile_pic = 'https://avatars3.githubusercontent.com/u/25548754?v=3&s=88';
      }
      if(res.message.profile_details.profile_info){
        this.register.get('First').setValue(res.message.profile_details.profile_info.first_name);
        this.register.get('Last').setValue(res.message.profile_details.profile_info.last_name);
        this.register.get('Mobile').setValue(res.message.profile_details.profile_info.mobile);
        this.register.get('Address').setValue(res.message.profile_details.profile_info.address);
        this.user_name = res.message.profile_details.profile_info.first_name + ' '+  res.message.profile_details.profile_info.last_name;
                 
      }
      }
      else{
        this.header_profile = 'http://lorempixel.com/850/280/nightlife/5/';
        this.profile_pic = 'https://avatars3.githubusercontent.com/u/25548754?v=3&s=88';
      }
    });
      this.register = this._builder.group({
       First : ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_-]+')])],
       Last  : ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_-]+')])],
       Mobile : ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{10,15}')])],
       Address : ['', Validators.compose([Validators.required])], 

     });
  } 
 
   profileChanger($event, profile): void {
        var image:any = new Image();
     let fileList: FileList = $event.target.files;
 
    if(fileList.length > 0) {
        let file: File = fileList[0];
            console.log(file);
       this.clickevent.subscribe(res=>{
       this._http.imageupload(file, profile).subscribe(res=>{
       
             if(res.success == "true"){
          this.success = res.message;
           $('#success-alert').fadeIn();
           window.setTimeout(function(){
            $('#success-alert').fadeOut();
           }, 2000);
           
             }
        });
   });
      
    }
        this.readFile($event.target, profile);
      }

      readFile (inputValue : any, value) : void {
          var image:any = new Image();
        let reader = new FileReader (),
              file : File = inputValue.files[0];
              console.log(file);
          reader.readAsDataURL(file);    
        reader.onload = (loadEvent:any) => {
          image.src = loadEvent.target.result;
          if(value == 'header'){
        this.headercropper.setImage(image);}
        else{
          this.profilecropper.setImage(image);
        }
          this.onLoadCallback(reader.result,value);
      }
      }
     onLoadCallback(event, value) {
      
       if(value == 'header'){
         this.header_profile = event;
       }
       else if(value == 'profile'){
         this.profile_pic = event;
       }
         
        }
    
        profile_update(value,valid){
        
       if(valid){
           console.log(value);
         this.loading = true;
         this.sub_button =false;
          this._http.profile_info(value).subscribe(res=> {

          if(res.success == "true"){
              this.success = res.message;
               $('#success-alert').fadeIn();
           window.setTimeout(function(){
            $('#success-alert').fadeOut();
           }, 2000);
      
          }
          else if(res.success == false){
            this.loading = false;
            this.sub_button = true;
             this.error = res.message;
          }  
          });
        
       }
        }

t(value){
 console.log(this.cropperSettings1);
}
}
