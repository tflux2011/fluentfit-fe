import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  #authService = inject(AuthService);
  #router = inject(Router);

  canActivate(): boolean {
    const token = this.#authService.getToken(); 
    if (token) {
      return true; 
    } else {
      this.#router.navigate(['/sign-in']); 
      return false;
    }
  }
}