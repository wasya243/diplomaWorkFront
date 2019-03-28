import { Injectable } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  CanActivate, Router
} from '@angular/router';
import { AuthService } from './auth.service';
import { StorageService } from '../core/storage.service';


@Injectable({
  providedIn: 'root'
})
export class MasterGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if authorized
    const isAuthorized = this.authService.isAuthorized();

    if (!isAuthorized) {
      this.router.navigate([ AuthService.defaultPaths.unauthorized ]);
      return false;
    }

    // Check if has access (route can be accessed by anyone)
    if (!route.data || !route.data.roles || !Array.isArray(route.data.roles)) {
      return true;
    }

    const routeRoles = route.data.roles;
    const { userInfo: { role } } = this.storageService.getUserData();
    const isHavePermission = routeRoles.indexOf(role) >= 0;

    if (!isHavePermission) {
      const routeToNavigate = AuthService.defaultPaths[ role ] || AuthService.defaultPaths[ 'access-denied' ];
      this.router.navigate([ routeToNavigate ]);
      return false;
    }

    return true;

  }

}
