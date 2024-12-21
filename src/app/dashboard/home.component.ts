import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';
import { IInterviewHistory, IProgress } from '../../interfaces/interface';

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
  imports: [CommonModule, RouterLink, DatePipe],
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
      <section class="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center space-x-4">
            <div class="bg-primary-light p-3 rounded-full">
              <span class="text-primary text-xl"><i class="bi bi-graph-up-arrow text-4xl text-primary"></i></span>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Sessions Completed</p>
              <h2 class="text-2xl font-bold text-primary">{{this.$interviewHistory().length ? this.$interviewHistory().length: 0}}</h2>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center space-x-4">
            <div class="bg-primary-light p-3 rounded-full">
              <span class="text-primary text-xl">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185"/>
                </svg>
            </span>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Comprehension Score</p>
              <h2 class="text-2xl font-bold text-primary">{{this.$progress().comprehensionScore || 0}}</h2>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center space-x-4">
            <div class="bg-primary-light p-3 rounded-full">
              <span class="text-primary text-xl"><i class="bi bi-megaphone"></i></span>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Pronunciation Accuracy</p>
              <h2 class="text-2xl font-bold text-primary">{{this.$progress().pronunciationAccuracy || 0}}</h2>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center space-x-4">
            <div class="bg-primary-light p-3 rounded-full">
              <span class="text-primary text-xl">
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 19 3.5-9 3.5 9m-6.125-2h5.25M3 7h7m0 0h2m-2 0c0 1.63-.793 3.926-2.239 5.655M7.5 6.818V5m.261 7.655C6.79 13.82 5.521 14.725 4 15m3.761-2.345L5 10m2.761 2.655L10.2 15"/>
              </svg>

              </span>
            </div>
            <div>
              <p class="text-gray-500 text-sm">Vocabulary Improvement</p>
              <h2 class="text-2xl font-bold text-primary">{{this.$progress().vocabularyImprovement || 0}}</h2>
            </div>
          </div>
        </div>
        
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
          @for(activity of $interviewHistory(); track activity){
          <li class="py-4 flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="bg-gray-100 p-2 rounded-full">
                <span><i class="bi bi-activity"></i></span>
              </div>
              <div>
                <p class="font-medium text-primary">{{ activity.title || "Question Title"}}</p>
                <p class="text-sm text-gray-500">{{ activity.feedback.relevance }}</p>
              </div>
            </div>
            <span class="text-sm text-gray-500">{{activity.date | date}}</span>
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
  initialHistory: IInterviewHistory[] = [{
    questionId: '',
      response: '', 
      date: '',
      questionType: '',
      title: '',
      feedback: {
        clarity: '',
        relevance: '',
        pronunciation: '',
        grammar: '',
       
      },
      score: 0
  }];
  initialProgress:IProgress = {
    comprehensionScore: 0,
    pronunciationAccuracy: 0,
    vocabularyImprovement: 0,
    badges: []
  }
  $interviewHistory = signal<IInterviewHistory[]>(this.initialHistory);
  $progress = signal<IProgress>(this.initialProgress);

  constructor() {
    effect(() => {
      this.$fullname.set(this.#auth.getUser()['firstname']);
      this.$interviewHistory.set(this.#auth.getUser()['interviewHistory']);
      this.$progress.set(this.#auth.getUser()['progress']);
    })
  }

  keyMetrics: DashboardCard[] = [
    {
      icon: `<i class="bi bi-graph-up-arrow text-4xl text-primary"></i>`,
      title: 'Sessions Completed',
      value: this.$interviewHistory().length.toString(),
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
  

}