import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  t: boolean = true;
  constructor(private _activate: ActivatedRoute, private _http: HttpService, private _router: Router) { 
  this._activate.params.subscribe((params: Params) => {
        let token = params['token'];
        if(token){
        localStorage.setItem('currentuser_success', 'true');
        localStorage.setItem('currentuser_token', token);
        this._router.navigate(['admin']);
        }
      });
  }

  ngOnInit() {
  }
  logout(){
    localStorage.clear();
    this._router.navigate(['login']);
  }

}
