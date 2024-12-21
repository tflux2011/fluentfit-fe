import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { BaseResponse, IAuthLoginPayload, IAuthRegisterPayload, IUser } from '../../interfaces/interface';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient);
  url = environment.apiUrl;
  private _isLoggedIn = signal<boolean>(false);
  
  private tokenKey = 'authToken';
  private userKey = 'authUser';

  isLoggedIn() {
    return this._isLoggedIn();
  }

  // Save token and user to localStorage/sessionStorage
  storeSession(token: string, user: Partial<IUser>): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  updateUser(user: Partial<IUser>):void{
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  // Get user
  getUser(): IUser {
    const user =
      localStorage.getItem(this.userKey) || sessionStorage.getItem(this.userKey);
      // const defaultUser = {
      //     progress: IProgress;
      //     interviewHistory: IInterviewHistory[];
      //     firstname: string,
      //     lastname: string,
      // }
    return user ? JSON.parse(user) : null;
  }

  // Clear session
  clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  constructor() {
    effect(() => {
      const token = this.getToken();
      if (token) {
        this._isLoggedIn.set(true); // Set logged-in state if a token exists
      }
    })
  }

  handleLogout(){
    this.clearSession();
    this._isLoggedIn.set(false);
  }

  handleSignUp(payload:IAuthRegisterPayload){
    return this.#http.post(this.url+'auth/register', JSON.stringify(payload), { headers: {'Content-Type':'application/json'} });
  }

  handleSignIn(payload:IAuthLoginPayload){
    return this.#http.post(this.url+'auth/login', payload, { headers: {'Content-Type':'application/json'} }).pipe(
    tap((response:BaseResponse) => {
      if (response && response.token && response.user) {
      this.storeSession(response.token, response.user);
      console.log(response.user);
      this._isLoggedIn.set(true); // Update login state
      }
    })
  );;
  }
}
