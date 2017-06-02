import { Routes } from '@angular/router';
import { LoginComponent } from '../component/login/login.component';
import { AdmindashboardComponent } from '../component/admindashboard/admindashboard.component';
import { UserdahboardComponent } from '../component/userdahboard/userdahboard.component';
import { RegisterComponent } from '../component/register/register.component';
import { IndexComponent } from '../component/index/index.component';
import { ImmutableComponent } from '../component/immutable/immutable.component';
import { EmailVerificationComponent } from '../component/email-verification/email-verification.component';
import { ChatThreadComponent } from '../component/chat-thread/chat-thread.component';
import { GooglemapComponent } from '../component/googlemap/googlemap.component';
import { YoutubeComponent } from '../component/youtube/youtube.component';
import { RouterGuards } from './routerGuards';
import { ResolveService } from '../service/resolve.service';
import { ProfileComponent } from '../component/profile/profile.component';
import { ViewProfileComponent } from '../component/view-profile/view-profile.component';
import { Select2Component } from '../component/select2/select2.component';

export const  router: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent, data:{ login: true}, },
   {path: 'register', component: RegisterComponent },
   {path: 'register/email-verification', component: EmailVerificationComponent},
   {path: 'admin/token/', component: AdmindashboardComponent,},
  {path: 'admin', component: AdmindashboardComponent, canActivate: [RouterGuards],
    children: [
      { path: '', component: IndexComponent },
      { path: 'googlemap', component: GooglemapComponent },
      { path: 'youtube', component: YoutubeComponent },
      { path: 'edit-profile', component: ProfileComponent },
      { path: 'view-profile', component: ViewProfileComponent },
      { path: 'select2', component: Select2Component}
    ] },
  {path: 'user/:id', component: UserdahboardComponent,resolve: {contact: ResolveService}, canActivate: [RouterGuards]},
 

];
