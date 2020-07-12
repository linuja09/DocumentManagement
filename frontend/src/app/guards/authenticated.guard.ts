import { TokenService } from './../Services/token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.tokenService.loggedIn()){
        return this.tokenService.loggedIn()
      }
      else{
        this.route.navigateByUrl('/login')
      }

  }

  constructor(
    private tokenService: TokenService,
    private route: Router,
  ) {}

}
