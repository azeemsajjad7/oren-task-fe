import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (localStorage.getItem('online_fd_token')) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
