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

  constructor(
    private authService : AuthService,
    private tokenService : TokenService
  ) { }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(value => this.isLoggedIn = value);
  }

  handleLogout(event: MouseEvent): void {
    event.stopPropagation();
    this.authService.changeAuthStatus(false);
    this.tokenService.remove();
  }

}
