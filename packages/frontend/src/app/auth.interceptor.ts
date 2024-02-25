import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next, authService = inject(AuthService)) => {
  let request = req;
  const allowedOrigins = ['/api'];

  const accessToken = authService.getAccessToken();
  if(accessToken && !!allowedOrigins.find(origin => req.url.includes(origin))) {
    request = req.clone({ setHeaders: { 'Authorization': `Bearer ${accessToken}` } });
  }

  return next(request);
};
