import { CanActivateFn } from '@angular/router';
import { ACR_VALUES_1FA, ACR_VALUES_2FA, AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state, authService = inject(AuthService)) => {
  return authService.isAuthenticated$;
};
