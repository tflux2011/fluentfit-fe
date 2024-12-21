import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const apiClientInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const isMultipart = req.body instanceof FormData;

  const reqWithToken = req.clone({
    setHeaders: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(isMultipart ? {} : { 'Content-Type': 'application/json' }) // Let the browser handle Content-Type for multipart
    }
  });

  return next(reqWithToken);
};