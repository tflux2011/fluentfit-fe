import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a [routerLink]="['']" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="fluentfit-primary.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FluentFit</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-secondary dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a [routerLink]="['features']" class="nav-link" routerLinkActive="active" aria-current="page" >Features</a>
        </li>
        <li>
          <a [routerLink]="['how-it-works']" class="nav-link" routerLinkActive="active">How It Works</a>
        </li>
        <li>
          <a [routerLink]="['testimonials']" routerLinkActive="active" class="nav-link" 
          [routerLinkActiveOptions]="{exact:true}">Testimonials</a>
        </li>
        
        <li>
          <a [routerLink]="['pricing']" class="nav-link" routerLinkActive="active">Pricing</a>
        </li>
        @if(!authService.isLoggedIn()){
        <li>
          <a [routerLink]="['sign-up']" class="nav-link" routerLinkActive="active">Sign Up</a>
        </li>
        <li>
          <a [routerLink]="['sign-in']" routerLinkActive="active" class="nav-link">Sign In</a>
        </li>
        }@else{
          <li>
            <a [routerLink]="['dashboard']" routerLinkActive="active" class="nav-link">Dashboard</a>
          </li>
          <li>
            <a (click)="handleLogout()" routerLinkActive="active" class="nav-link cursor-pointer">Logout</a>
          </li>
        }
      </ul>
    </div>
  </div>
</nav>

  `,
  styles: ``
})
export class NavbarComponent {
  #authService = inject(AuthService);
  constructor(public authService: AuthService) {
    console.log(authService.isLoggedIn());
  }
  handleLogout(){
    this.#authService.handleLogout();
  }
}
