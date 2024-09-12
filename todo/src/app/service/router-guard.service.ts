import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { HardcodeAuthenticationService } from './hardcode-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class RouterGuardService implements CanActivate {
  constructor(
    private hardcodeAuthenticationComponent: HardcodeAuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.hardcodeAuthenticationComponent.isUserLoggedIn()) return true;
    this.router.navigate(['login']);

    return false;
  }
}
