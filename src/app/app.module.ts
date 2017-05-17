import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { router } from './router/router';
import { AdmindashboardComponent } from './component/admindashboard/admindashboard.component';
import { IndexComponent } from './component/index/index.component';
import { NewprofessorComponent } from './component/newprofessor/newprofessor.component';
import { NewstudentComponent } from './component/newstudent/newstudent.component';
import { UserdahboardComponent } from './component/userdahboard/userdahboard.component';
import { HttpService } from './service/http.service';
import { RouterGuards } from './router/routerGuards';
import { AuthService } from './service/auth.service';
import { RegisterComponent } from './component/register/register.component';
import { ResolveService } from './service/resolve.service';
import { ImmutableComponent } from './component/immutable/immutable.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { EmailVerificationComponent } from './component/email-verification/email-verification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdmindashboardComponent,
    IndexComponent,
    NewprofessorComponent,
    NewstudentComponent,
    UserdahboardComponent,
    RegisterComponent,
    ImmutableComponent,
    EmailVerificationComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DpDatePickerModule,
    RouterModule.forRoot(router)
  ],
  providers: [AuthService, HttpService, RouterGuards,   ResolveService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
