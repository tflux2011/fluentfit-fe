import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../dashboard/sidebar.component';
import { HeaderComponent } from '../dashboard/header.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="grid grid-cols-[80px_1fr] h-screen">
      <!-- Sidebar -->
      <app-sidebar />

      <!-- Main Content -->
      <div class="flex flex-col">
        <app-header class="bg-secondary" />
        <div class="flex-grow pt-0 px-4 pb-4 bg-gray-50">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class DashboardLayoutComponent {}