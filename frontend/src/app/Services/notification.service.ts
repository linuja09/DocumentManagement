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
    return this.http.get( `${this.baseUrl}/getActiveUserNotifications`);
  }

  setNotificationCount(count: any) {
    this.notificationCount.next(count)
  }

  getActiveNotificationsCount(token?: any) {
    this.http.get( `${this.baseUrl}/getActiveUserNotifications`).subscribe(
      data => {
        this.setNotificationCount(data)
      }
    )
  }

  public getAllNotifications() {
    return this.http.get( `${this.baseUrl}/getAllUserNotifications`);
  }

  public updateNotifications() {
    return this.http.get( `${this.baseUrl}/updateNotifications`);
  }
}
