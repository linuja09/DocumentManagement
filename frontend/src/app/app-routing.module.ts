import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './components/home/home.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { GuestGuard } from './guards/guest.guard';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path : 'login',
    component : LoginComponent,
    canActivate : [GuestGuard]
  },
  {
    path : 'signup',
    component : SignupComponent,
    canActivate : [GuestGuard]
  },
  {
    path : 'profile',
    component : ProfileComponent,
    canActivate : [AuthenticatedGuard]
  },
  {
    path : 'request-password-reset',
    component : RequestResetComponent,
    canActivate : [GuestGuard]
  },
  {
    path : 'response-password-reset',
    component : ResponseResetComponent,
    canActivate : [GuestGuard]
  },
  {
    path : 'home',
    component : HomeComponent,
    canActivate : [AuthenticatedGuard]
  },
  {
    path : 'notifications',
    component : NotificationsComponent,
    canActivate : [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
