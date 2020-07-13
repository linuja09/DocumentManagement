import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:8000/api';

  private notificationCount = new BehaviorSubject<any>(0);
  notificationNumber = this.notificationCount.asObservable();


  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  public getActiveNotifications() {
    const formData = new FormData();
    let token =this.tokenService.get();
    formData.append('token', token);
    return this.http.post( `${this.baseUrl}/getActiveUserNotifications`, formData);
  }

  setNotificationCount(count: any) {
    this.notificationCount.next(count)
  }

  getActiveNotificationsCount(token?: any) {
    const formData = new FormData();
    if(!token){
      token =this.tokenService.get();
    }
    formData.append('token', token);
    this.http.post( `${this.baseUrl}/getActiveUserNotifications`, formData).subscribe(
      data => {
        this.setNotificationCount(data)
      }
    )
  }

  public getAllNotifications() {
    const formData = new FormData();
    let token =this.tokenService.get();
    formData.append('token', token);
    return this.http.post( `${this.baseUrl}/getAllUserNotifications`, formData);
  }

  public updateNotifications() {
    let token =this.tokenService.get();
    const formData = new FormData();
    formData.append('token', token);
    return this.http.post( `${this.baseUrl}/updateNotifications`, formData);
  }
}
