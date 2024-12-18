import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

interface DashboardCard {
  icon: SafeHtml;
  title: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface QuickAction {
  label: string;
  icon: string;
  color: string;
  link: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class=" min-h-screen p-6 space-y-6">
      <!-- Header -->
      <header class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-normal text-primary">Welcome Back, {{$fullname()}}</h1>
          <p class="text-primary">Ready to ace your next interview?</p>
        </div>
        <a [routerLink]="['/dashboard/practise']" class="bg-primary text-secondary px-4 py-2 rounded-lg shadow-md hover:bg-green-900 transition">
          Start Practice
        </a>
      </header>

      <!-- Key Metrics -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
        @for( card of keyMetrics; track card){
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center space-x-4">
            <div class="bg-primary-light p-3 rounded-full">
              <span class="text-primary text-xl" [innerHTML]="card.icon"></span>
            </div>
            <div>
              <p class="text-gray-500 text-sm">{{ card.title }}</p>
              <h2 class="text-2xl font-bold text-primary">{{ card.value }}</h2>
            </div>
          </div>
          <div *ngIf="card.trend" class="mt-2 flex items-center text-sm">
            <span [ngClass]="{
              'text-green-600': card.trend === 'up',
              'text-red-600': card.trend === 'down',
              'text-gray-500': card.trend === 'neutral'
            }">
              {{ card.trend === 'up' ? '▲' : card.trend === 'down' ? '▼' : '→' }} 
              12.5%
            </span>
            <span class="ml-2 text-gray-500">vs last week</span>
          </div>
        </div>
        }
      </section>

      <!-- Quick Actions -->
      <section class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-lg font-bold text-primary mb-4">Quick Actions</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">

          @for(action of quickActions; track action){
          <button 
            class="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-primary-light transition"
            [style.backgroundColor]="action.color + '10'"
            [routerLink]="[action.link]"
          >
            <div class="p-3 rounded-full" [style.backgroundColor]="action.color + '20'">
              <span class="text-2xl" [style.color]="action.color" [innerHTML]="action.icon"></span>
            </div>
            <span class="mt-2 text-sm text-gray-700">{{ action.label }}</span>
          </button>
          }
        </div>
      </section>

      <!-- Recent Activity -->
      <section class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-lg font-bold text-primary mb-4">Recent Activity</h2>
        <ul class="divide-y divide-gray-100">
          @for(activity of recentActivities; track activity){
          <li class="py-4 flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="bg-gray-100 p-2 rounded-full">
                <span>{{ activity.icon }}</span>
              </div>
              <div>
                <p class="font-medium text-primary">{{ activity.title }}</p>
                <p class="text-sm text-gray-500">{{ activity.description }}</p>
              </div>
            </div>
            <span class="text-sm text-gray-500">{{ activity.time }}</span>
          </li>
        }
        </ul>
      </section>
    </div>
  `,
  styles: [`
    /* Additional component-specific styles can be added here */
    :host {
      --primary: #31473a;
      --secondary: #edf4f2;
      --primary-light: rgba(49, 71, 58, 0.2);
    }
    .bg-primary { background-color: var(--primary); }
    .text-primary { color: var(--primary); }
    .bg-secondary { background-color: var(--secondary); }
    .text-secondary { color: var(--secondary); }
  `]
})
export class HomeComponent {
  #auth = inject(AuthService);
  $fullname = signal('');

  constructor(private sanitizer: DomSanitizer) {
    effect(() => {
      this.$fullname.set(this.#auth.getUser()['firstname']);
    })
  }

  keyMetrics: DashboardCard[] = [
    {
      icon: `<i class="bi bi-graph-up-arrow text-4xl text-primary"></i>`,
      title: 'Sessions Completed',
      value: '10',
      trend: 'up'
    },
    {
      icon: '<i class="bi bi-clock text-4xl text-primary-dark"></i>',
      title: 'Hours Practiced',
      value: '15h',
      trend: 'neutral'
    },
    {
      icon: '<i class="bi bi-mortarboard text-4xl text-primary-dark"></i>',
      title: 'Goals Achieved',
      value: '5',
      trend: 'down'
    }
  ];

  quickActions: QuickAction[] = [
    { label: 'Guided Practice', icon: '<i class="bi bi-rocket-takeoff-fill"></i>', color: '#3B82F6', link:'/dashboard/practise' },
    { label: 'Free Practice', icon: '<i class="bi bi-bicycle"></i>', color: '#10B981', link:'/dashboard/practise' },
    { label: 'Progress', icon: '<i class="bi bi-graph-up"></i>', color: '#6366F1', link:'/dashboard/progress' },
    { label: 'Settings', icon: '<i class="bi bi-gear"></i>', color: '#F43F5E', link:'/dashboard/settings' }
  ];

  recentActivities = [
    {
      icon: '🎤',
      title: 'Pronunciation Practice',
      description: 'Improved vocabulary for Java interviews',
      time: '1h ago'
    },
    {
      icon: '📝',
      title: 'Mock Interview',
      description: 'Completed 3 React-based coding challenges',
      time: '2d ago'
    },
    {
      icon: '🏆',
      title: 'Achievement Unlocked',
      description: 'Scored 95% in technical questions',
      time: '5d ago'
    }
  ];

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}