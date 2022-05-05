import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.existsToken()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
