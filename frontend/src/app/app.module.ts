import { HomeComponent } from './components/home/home.component';
import { SignupService } from './Services/signup.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AdminComponent } from './components/admin/admin.component';
import { TokenInterceptor } from './Interceptors/token.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    HomeComponent,
    NotificationsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SnotifyModule
  ],
  providers: [
    SignupService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    {  provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
   },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
