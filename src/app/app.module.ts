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
import { ChatService } from './service/chat.service';
import { RegisterComponent } from './component/register/register.component';
import { ResolveService } from './service/resolve.service';
import { ImmutableComponent } from './component/immutable/immutable.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { EmailVerificationComponent } from './component/email-verification/email-verification.component';
import { ChatThreadComponent } from './component/chat-thread/chat-thread.component';
import { GooglemapComponent } from './component/googlemap/googlemap.component';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { YoutubeComponent } from './component/youtube/youtube.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ViewProfileComponent } from './component/view-profile/view-profile.component';
import { ImageCropperComponent, CropperSettings } from 'ng2-image-cropper';
import { Select2Component } from './component/select2/select2.component';
import { RangeDirective } from './directive/rangeDirective';
import { InvalidMessageDirective } from './directive/invalidMessageDirective';
import { InvalidTypeDirective } from './directive/invalidTypeDirective';
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
    EmailVerificationComponent,
    ChatThreadComponent,
    GooglemapComponent,
    YoutubeComponent,
    ProfileComponent,
    ViewProfileComponent,
    ImageCropperComponent,
    Select2Component,
    RangeDirective,
    InvalidMessageDirective,
    InvalidTypeDirective
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DpDatePickerModule,
    RouterModule.forRoot(router),
    AgmCoreModule.forRoot({
     apiKey : 'AIzaSyBZNzpzEEErw0svrxcdEKa3mfCeioNqo6A',
     libraries : ['places']
    }),
    
  ],
  providers: [AuthService, HttpService, RouterGuards,   ResolveService, ChatService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
