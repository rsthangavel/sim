import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
    selector : '[range]'
})
export  class RangeDirective implements OnInit{
    _range= [];
    
    @Input() 
    set range( value ){
       this.generatenumber(value[0], value[1]);

      this._range.forEach(num =>{
          this._view.createEmbeddedView(this._temp,{
              $implicit : num
          })
      })
    }
    constructor(private _view: ViewContainerRef, private  _temp: TemplateRef<any>){}
    ngOnInit(){
   
    }
   generatenumber(v1,v2){
     for(let i=v1; i<v2; i++){
        this._range.push(i);
     }
     //console.log(typeof(v1));
   }

}