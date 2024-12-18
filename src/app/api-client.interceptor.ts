import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const apiClientInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Inject the AuthService
  const token = authService.getToken(); // Retrieve the token

  // Clone the request and append headers
  const reqWithToken = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '', // Append token if available
      'Content-Type': 'application/json' // Set Content-Type header
    }
  });

  return next(reqWithToken); // Pass the modified request to the next handler
};