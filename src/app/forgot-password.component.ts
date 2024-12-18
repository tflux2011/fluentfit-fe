import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
   <section class="bg-primary dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
   
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
                  Forgot Password
              </h1>
              <form class="space-y-4 md:space-y-6" [formGroup]="form" (ngSubmit)="handleForgotPassword()">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email"  id="email" [formControl]="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
                  <button type="submit" class="btn-primary-full" [disabled]="!form.valid">Send Email</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      I've remembered my password, <a [routerLink]="['/sign-in']" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  `,
  styles: ``
})
export class ForgotPasswordComponent {
  form = inject(FormBuilder).group({
    email: ['', Validators.required],
  });

  get email(){ return this.form.controls.email}

  handleForgotPassword(){

  }
}
