// progress.component.ts
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface TestResult {
  category: string;
  score: number;
  improvement: number;
}

interface Milestone {
  name: string;
  progress: number;
  total: number;
}

interface Challenge {
  title: string;
  date: string;
  difficulty: string;
}

@Component({
  selector: 'app-progress',
  imports: [NgClass],
  template: `
    <div class="container px-4 py-8">
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Your Progress</h1>
        <p class="text-gray-600 mt-2">Track your interview preparation journey</p>
      </div>

      <!-- Test Results Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-semibold mb-4">Test Results</h2>
          <div class="space-y-4">
            @for(result of testResults; track result){
              <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-700">{{ result.category }}</span>
                <span class="text-sm font-medium" 
                      [ngClass]="{'text-green-600': result.improvement > 0, 
                                'text-red-600': result.improvement < 0}">
                  {{ result.improvement > 0 ? '+' : ''}}{{ result.improvement }}%
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                     [style.width]="result.score + '%'"></div>
              </div>
            </div>
            }
          </div>
        </div>

        <!-- Learning Milestones -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-xl font-semibold mb-4">Learning Milestones</h2>
          <div class="space-y-4">
          @for(milestone of milestones; track milestone){
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-gray-700">{{ milestone.name }}</span>
                <span class="text-sm text-gray-600">
                  {{ milestone.progress }}/{{ milestone.total }}
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                     [style.width]="(milestone.progress / milestone.total * 100) + '%'"></div>
              </div>
            </div>
          }
          </div>
        </div>
      </div>

      <!-- Feedback Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Personalized Feedback</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          @for(feedback of personalizedFeedback; track feedback){
          <div 
               class="p-4 rounded-lg" 
               [ngClass]="{'bg-blue-50': feedback.type === 'strength',
                          'bg-yellow-50': feedback.type === 'improvement'}">
            <p class="text-sm font-medium" 
               [ngClass]="{'text-blue-700': feedback.type === 'strength',
                          'text-yellow-700': feedback.type === 'improvement'}">
              {{ feedback.message }}
            </p>
          </div>
        }
        </div>
      </div>

      <!-- Upcoming Challenges -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-xl font-semibold mb-4">Upcoming Challenges</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        @for(challenge of upcomingChallenges; track challenge){  
         <div 
               class="border border-gray-200 rounded-lg p-4">
            <h3 class="font-medium text-gray-900">{{ challenge.title }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ challenge.date }}</p>
            <span class="inline-block px-2 py-1 text-xs rounded-full mt-2"
                  [ngClass]="{'bg-green-100 text-green-800': challenge.difficulty === 'Easy',
                             'bg-yellow-100 text-yellow-800': challenge.difficulty === 'Medium',
                             'bg-red-100 text-red-800': challenge.difficulty === 'Hard'}">
              {{ challenge.difficulty }}
            </span>
          </div>
        }
        </div>
      </div>
    </div>
  `,
})
export class ProgressComponent implements OnInit {
  testResults: TestResult[] = [
    { category: 'Technical Skills', score: 85, improvement: 5 },
    { category: 'Communication', score: 78, improvement: 3 },
    { category: 'Problem Solving', score: 92, improvement: 7 },
    { category: 'System Design', score: 70, improvement: -2 }
  ];

  milestones: Milestone[] = [
    { name: 'Basic Algorithms', progress: 8, total: 10 },
    { name: 'Data Structures', progress: 6, total: 8 },
    { name: 'System Design', progress: 3, total: 5 },
    { name: 'Behavioral Questions', progress: 4, total: 6 }
  ];

  personalizedFeedback = [
    { type: 'strength', message: 'Excellent progress in algorithm complexity analysis!' },
    { type: 'improvement', message: 'Consider practicing more system design scenarios.' },
    { type: 'strength', message: 'Strong communication skills in technical discussions.' },
    { type: 'improvement', message: 'Focus on improving database optimization concepts.' }
  ];

  upcomingChallenges: Challenge[] = [
    { title: 'Data Structures Deep Dive', date: 'Tomorrow, 2:00 PM', difficulty: 'Medium' },
    { title: 'Algorithm Challenge', date: 'Dec 20, 3:00 PM', difficulty: 'Hard' },
    { title: 'Mock Interview', date: 'Dec 21, 1:00 PM', difficulty: 'Easy' }
  ];

  constructor() {}

  ngOnInit(): void {}
}