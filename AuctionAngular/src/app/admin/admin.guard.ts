import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('loggedIn') === 'true' && this.authService.loggedIn === true) {
      if (this.authService.user.email === 'admin@gmail.com') {
        return true;
      }
    }
    // not Admin logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
