import { Routes } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';
import { AdmindashboardComponent } from '../component/admindashboard/admindashboard.component';
import { UserdahboardComponent } from '../component/userdahboard/userdahboard.component';
import { RegisterComponent } from '../component/register/register.component';
import { IndexComponent } from '../component/index/index.component';
import { ImmutableComponent } from '../component/immutable/immutable.component';
import { EmailVerificationComponent } from '../component/email-verification/email-verification.component';
import { RouterGuards } from './routerGuards';
import { ResolveService } from '../service/resolve.service';
export const  router: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent, data:{ login: true}, },
   {path: 'register', component: RegisterComponent },
   {path: 'register/email-verification', component: EmailVerificationComponent},
   {path: 'admin/token/:token', component: AdmindashboardComponent,},
  {path: 'admin', component: AdmindashboardComponent, canActivate: [RouterGuards]},
  {path: 'user/:id', component: UserdahboardComponent,resolve: {contact: ResolveService}, canActivate: [RouterGuards]},
 

];
