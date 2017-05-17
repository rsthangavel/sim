import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-immutable',
  templateUrl: './immutable.component.html',
  styleUrls: ['./immutable.component.css']
})
export class ImmutableComponent implements OnInit {
  
  constructor() {
    let movie = {
      name: 'Star Wars',
      star : 5
    }
    let my = Object.assign({},movie);
   
    my.star = 6;
    console.log(movie.star);
    
   }

  ngOnInit() {
  }

}
