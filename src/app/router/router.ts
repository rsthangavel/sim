import { Routes } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';
import { AdmindashboardComponent } from '../component/admindashboard/admindashboard.component';
import { UserdahboardComponent } from '../component/userdahboard/userdahboard.component';
import { RegisterComponent } from '../component/register/register.component';
import { IndexComponent } from '../component/index/index.component';
import { RouterGuards } from './routerGuards';
import { ResolveService } from '../service/resolve.service';
export const  router: Routes = [
  {path: '', redirectTo: 'login', pathMatch:'full' },
  {path: 'login/:id', component: LoginComponent, data:{ allow: true}, resolve: {contact: ResolveService}},
   {path: 'register', component: RegisterComponent },
  {path: 'admin', component: AdmindashboardComponent, canActivate: [RouterGuards]},
  {path: 'user', component: UserdahboardComponent, canActivate: [RouterGuards]},
 

];
