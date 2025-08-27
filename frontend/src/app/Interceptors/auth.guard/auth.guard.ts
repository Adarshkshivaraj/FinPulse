import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    let token = localStorage.getItem('authToken');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('authToken');
    }

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
