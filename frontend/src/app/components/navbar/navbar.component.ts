import { NotificationService } from './../../Services/notification.service';
import { TokenService } from './../../Services/token.service';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean;
  public notificationNumber;

  constructor(
    private authService : AuthService,
    private tokenService : TokenService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(
      value => {
        this.isLoggedIn = value;
        if(value){
          this.notificationService.getActiveNotificationsCount();
          this.notificationService.notificationNumber.subscribe(

            count => {
              this.notificationNumber = count;
            }
          )
        }

      }
      );

  }

  handleLogout(event: MouseEvent): void {
    event.stopPropagation();
    this.authService.changeAuthStatus(false);
    this.tokenService.remove();
  }

}
