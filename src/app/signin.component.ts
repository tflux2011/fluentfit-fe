import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BaseResponse } from '../interfaces/interface';

@Component({
  selector: 'app-signin',
  imports: [RouterLink, ReactiveFormsModule],
  template: `
  <section class="bg-primary dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a [routerLink]="['']" class="flex items-center space-x-3 rtl:space-x-reverse mb-3">
        <img src="fluentfit.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">FluentFit</span>
    </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
                  Sign In
              </h1>
                @if($response()){
                    <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                     {{$response()}}
                </div>
                }
              <form class="space-y-4 md:space-y-6" [formGroup]="form" (ngSubmit)="handleSignIn()">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email"  id="email" [formControl]="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" [formControl]="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
              
                  <button type="submit" class="btn-primary-full flex items-center justify-center" [disabled]="!form.valid || isLoading">
                  @if(isLoading){
                    <svg 
                      aria-hidden="true" 
                      class="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary-600" 
                      viewBox="0 0 100 101" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08155 50.5908C9.08155 74.1683 25.8325 90.9193 49.41 90.9193C72.9875 90.9193 89.7385 74.1683 89.7385 50.5908C89.7385 27.0132 72.9875 10.2622 49.41 10.2622C25.8325 10.2622 9.08155 27.0132 9.08155 50.5908Z" 
                        fill="currentColor"
                      />
                      <path 
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 96.9885 33.5536C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.723 75.2124 7.41289C69.5422 4.1028 63.2754 1.94025 56.7688 1.05125C51.7666 0.367141 46.6976 0.446868 41.7345 1.27849C39.1973 1.69389 37.723 4.19778 38.3603 6.62326C38.9975 9.04874 41.4658 10.4715 43.9904 10.1071C47.9519 9.5146 51.9871 9.52696 55.932 10.1408C60.8619 10.9161 65.6379 12.7381 70.0156 15.5412C74.3932 18.3444 78.3155 22.0906 81.5842 26.602C83.8825 29.9146 85.6877 33.5204 86.9351 37.3178C87.7153 39.6912 90.0819 40.8799 92.5073 40.2427L93.9676 39.0409Z" 
                        fill="currentFill"
                      />
                    </svg>
                    }
                    @if(!isLoading){<span>Sign In</span>}
                    @if(isLoading){<span>Processing...</span>}
                    </button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don't have an account? <a [routerLink]="['/auth/sign-up']" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up here</a>
                  </p>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Forgot Password? <a [routerLink]="['/forgot-password']" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Click here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  `,
  styles: ``
})
export class SigninComponent {
    $response = signal('');
    #authService = inject(AuthService);
    form = inject(FormBuilder).group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
    
    isLoading = false; 

    #router = inject(Router);

    get email(){ return this.form.controls.email};
    get password(){ return this.form.controls.password};

    handleSignIn(): void {
        if(this.form.invalid) return;
        // Retrieve and validate input values
        const email = this.email.value?.trim() || '';
        const password = this.password.value?.trim() || '';
    
        // Basic validation
        if (!email || !password) {
            console.error('Email and password are required.');
            return; // Prevent further execution
        }
    
        // Prepare payload
        const payload = { email, password };

        this.isLoading = true;
    
        // Call authentication service
        this.#authService.handleSignIn(payload).subscribe({
            next: (res: BaseResponse) => {
                this.isLoading = false;
                if (res && res.token && res.user) {
                    this.#router.navigate(['/dashboard']);
                } else {
                    
                    console.error('Invalid response format:', res);
                }
            },
            error: (err) => {
                this.$response.set(err.error.message);
                this.isLoading = false;
                console.error('An error occurred during sign-in:', err);
            },
        });
    }
    
}
