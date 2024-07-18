import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
class AuthGuardService {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate() {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        return !!user.token;
      }),
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  authGaurdService: AuthGuardService = inject(AuthGuardService)
) => {
  return authGaurdService.canActivate();
};
