import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './services/auth.service';
import { BaseResponse, IAuthRegisterPayload } from '../interfaces/interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  template: `
    <section class="bg-primary dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
   
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form [formGroup]="form" class="space-y-4 md:space-y-6" (ngSubmit)="handleSignUp()">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                      <input type="text" [formControl]="firstname" id="firstname" class="text-input" placeholder="Enter First name" required="">
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                      <input type="text" [formControl]="lastname" id="lastname" class="text-input" placeholder="Enter Last name" required="">
                  </div>
                  <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" [formControl]="email" id="email" class="text-input" placeholder="name@company.com" required="">
                    <div *ngIf="email.invalid && email.touched">
                      <p class="text-red-500 text-sm" *ngIf="email.errors?.['required']">Email is required.</p>
                      <p class="text-red-500 text-sm" *ngIf="email.errors?.['email']">Invalid email format.</p>
                    </div>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" [formControl]="password" id="password" placeholder="••••••••" class="text-input" required="">
                      <div *ngIf="password.invalid && password.touched" class="text-red-600 text-sm">
                        <span *ngIf="password?.errors?.['required']">Password is required.</span>
                        <span *ngIf="password.errors?.['minlength']">Password must be at least 8 characters long.</span>
                      </div>
                  </div>
                  <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" [formControl]="confirm_password" id="confirm-password" placeholder="••••••••" class="text-input" required="">
                      <div *ngIf="confirm_password.invalid && confirm_password.touched" class="text-red-600 text-sm">
                        @if(confirm_password.errors?.['required']){<span>Please confirm your password.</span>}
                        @if(confirm_password.errors?.['mismatch']){<span >Passwords do not match.</span>}
                      </div>
                  </div>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" [formControl]="accept_terms" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button 
                    type="submit" 
                    class="btn-primary-full flex items-center justify-center" 
                    [disabled]="!form.valid || isLoading"
                  >
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
                    @if(!isLoading){<span>Create an account</span>}
                    @if(isLoading){<span>Processing...</span>}
                  </button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a [routerLink]="['/sign-in']" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  `,
  styles: ``
})
export class SignupComponent {
  #authService = inject(AuthService);
  #router = inject(Router);

  isLoading = false; 

  form = inject(FormBuilder).group({
    firstname: ['',[Validators.required, Validators.minLength(2)]],
    lastname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirm_password: ['', [Validators.required]],
    accept_terms: [false, [Validators.requiredTrue]],
  },
  {
    validators: this.matchPasswords('password', 'confirm_password'),
  });

  get firstname(){ return this.form.controls['firstname'] as FormControl;}
  get lastname(){ return this.form.controls['lastname'] as FormControl;}
  get email(){ return this.form.controls['email'] as FormControl;}
  get password(){ return this.form.controls['password'] as FormControl}
  get confirm_password(){ return this.form.controls['confirm_password'] as FormControl;}
  get accept_terms(){ return this.form.controls['accept_terms'] as FormControl;}

  
  matchPasswords(password: string, confirmPassword: string) {
    return (form: any) => {
      const passwordControl = form.controls[password];
      const confirmPasswordControl = form.controls[confirmPassword];

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  handleSignUp(){
    if(this.form.invalid) return;

    const email = this.email.value?.trim() || '';
    const password = this.password.value?.trim() || '';
    const lastname = this.lastname.value?.trim() || '';
    const firstname = this.firstname.value?.trim() || '';

    // Validate input values
    if (!email || !password || !firstname || !lastname) {
      console.error('All fields are required.');
      return;
    }

    // Prepare payload with stricter type
    const payload: IAuthRegisterPayload = {
      email,
      password,
      lastname,
      firstname,
    };


    this.isLoading = true; // Show loading spinner

    
    // Call authentication service
    this.#authService.handleSignUp(payload).subscribe({
        next: (res: Partial<BaseResponse>) => {
          this.isLoading = false;
            if (res && res.token && res.user) {
                this.#authService.storeSession(res.token, res.user); // Store token and user data
                this.#router.navigate(['/onboarding']);
            } else {
                console.error('Invalid response format:', res);
            }
        },
        error: (err) => {
          this.isLoading = false;
            console.error('An error occurred during sign-in:', err);
        },
    });
}
  
}
