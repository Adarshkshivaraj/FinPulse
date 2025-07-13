import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../Servies/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const isLoggedIn = authService.isLoggedIn();

  if (!isLoggedIn) {
    window.location.href = '/login';
    return false;
  }

  return true;
};
