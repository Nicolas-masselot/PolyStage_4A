import { Injectable } from '@angular/core';
import {CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthEleveGuard implements CanActivateChild
{

  constructor(private auth: AuthService,
              private router: Router) { }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if (this.auth.isAuthenticated() && this.auth.getRole() == 'eleve')
    {
      return true;
    }
    else
    {
      return this.router.parseUrl('/login');
    }
  }

}
