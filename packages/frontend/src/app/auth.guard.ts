import { CanActivateFn } from '@angular/router';
import { ACR_VALUES_1FA, ACR_VALUES_2FA, AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state, authService = inject(AuthService)) => {
  return authService.isAuthenticated$;
};

export const stepupAuthGuard: CanActivateFn = (route, state, authService = inject(AuthService)) => {
  if (authService.getIdTokenAcrClaim() === route.data['acrReq']) return true;

  authService.login(route.data['acrReq'], state.url);
  return false;
}