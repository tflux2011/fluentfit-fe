import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <div class="w-full h-16 bg-gray-50 shadow-md border-l text-primary flex items-center justify-between px-4 sticky">
  <a [routerLink]="['']" class="text-lg text-primary font-semibold">FluentFit</a>
  <div class="flex items-center gap-4">
    <button class="relative">
      <svg class="w-6 h-6 text-primary dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
      </svg>

      <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
    </button>
    <div class="w-8 h-8 bg-primary text-secondary rounded-full flex items-center justify-center">U</div>
  </div>
</div>

  `,
  styles: ``
})
export class HeaderComponent {

}
