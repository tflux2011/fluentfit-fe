import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="w-16 lg:w-20 h-screen bg-primary text-white flex flex-col justify-between fixed">
  <div class="mt-4 space-y-4">
    <a [routerLink]="['/dashboard/home']"  class="flex items-center space-x-3 rtl:space-x-reverse py-4 px-5">
      <img src="fluentfit.svg" class="h-8" alt="Flowbite Logo" />
    </a>
    <a [routerLink]="['/dashboard/home']" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="active" class="flex items-center justify-center p-4 rounded-lg hover:bg-white hover:text-green-800 hover:rounded-none">
      <i class="bi bi-house text-xl"></i>
    </a>
    <a [routerLink]="['/dashboard/practise']" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="active" class="flex items-center justify-center p-4 rounded-lg hover:bg-white hover:text-green-800 hover:rounded-none">
      <i class="bi bi-journal-code text-xl"></i>
    </a>
    <a [routerLink]="['progress']" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="active" class="flex items-center justify-center p-4 rounded-lg hover:bg-white hover:text-green-800 hover:rounded-none">
      <i class="bi bi-graph-up-arrow text-xl"></i>
    </a>
    <a [routerLink]="['rewards']" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="active" class="flex items-center justify-center p-4 rounded-lg hover:bg-white hover:text-green-800 hover:rounded-none">
    <svg class="text-xl dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
    </svg>

    </a>
    <a [routerLink]="['settings']" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="active" class="flex items-center justify-center p-4 rounded-lg hover:bg-white hover:text-green-800 hover:rounded-none">
      <i class="bi bi-gear text-xl"></i>
    </a>
  </div>

  <button class="p-4 hover:bg-white hover:text-green-800 hover:rounded-none" (click)="logout()">
  <i class="bi bi-box-arrow-in-left text-xl"></i>
  </button>
</div>
  `,
  styles: `.active{ @apply bg-white text-green-800 rounded-none}`
})
export class SidebarComponent {
  #authService = inject(AuthService);
  #router = inject(Router);

  logout() {
    this.#authService.handleLogout();
    this.#router.navigate(['']);
  }
}
