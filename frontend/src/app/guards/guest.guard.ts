import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../Services/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return !this.tokenService.loggedIn();
    }
  
    constructor(
      private tokenService: TokenService
    ) {}
  
}
