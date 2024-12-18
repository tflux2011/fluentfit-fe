// rewards.component.ts
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Achievement {
  name: string;
  description: string;
  icon: string;
  dateEarned: string;
}

interface RewardOption {
  title: string;
  description: string;
  pointsCost: number;
  category: string;
  available: boolean;
}

interface HistoryItem {
  type: 'earned' | 'redeemed';
  description: string;
  points: number;
  date: string;
}

@Component({
  selector: 'app-rewards',
  imports:[NgClass],
  template: `
    <div class="container px-4 py-8">
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Rewards Dashboard</h1>
        <p class="text-gray-600 mt-2">Track and redeem your rewards</p>
      </div>

      <!-- Rewards Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Available Points</p>
              <h3 class="text-2xl font-bold text-gray-900">{{ availablePoints }}</h3>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" 
                   [style.width]="(availablePoints / nextRewardThreshold * 100) + '%'"></div>
            </div>
            <p class="text-sm text-gray-600 mt-2">{{ nextRewardThreshold - availablePoints }} points until next reward</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Current Level</p>
              <h3 class="text-2xl font-bold text-gray-900">Level {{ currentLevel }}</h3>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-purple-600 h-2 rounded-full" 
                   [style.width]="levelProgress + '%'"></div>
            </div>
            <p class="text-sm text-gray-600 mt-2">{{ levelProgress }}% to Level {{ currentLevel + 1 }}</p>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">Current Streak</p>
              <h3 class="text-2xl font-bold text-gray-900">{{ currentStreak }} days</h3>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div class="flex justify-between mt-4">
          @for(day of streakDays; track day) {
          <div 
                 class="w-8 h-8 rounded-full flex items-center justify-center"
                 [ngClass]="{'bg-green-100 text-green-600': day.completed, 
                            'bg-gray-100 text-gray-400': !day.completed}">
              {{ day.label }}
            </div>
          }
          </div>
        </div>
      </div>

      <!-- Achievements Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Recent Achievements</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        @for(achievement of achievements; track achievement){
        <div 
               class="p-4 border border-gray-200 rounded-lg text-center">
            <div class="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center"
                 [ngClass]="achievement.icon">
            </div>
            <h3 class="font-medium text-gray-900">{{ achievement.name }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ achievement.description }}</p>
            <p class="text-xs text-gray-500 mt-2">Earned {{ achievement.dateEarned }}</p>
          </div>
        }  
        </div>
      </div>

      <!-- Redeem Rewards Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Redeem Rewards</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        @for(reward of rewardOptions; track reward){
        <div 
               class="p-4 border border-gray-200 rounded-lg">
            <h3 class="font-medium text-gray-900">{{ reward.title }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ reward.description }}</p>
            <div class="flex justify-between items-center mt-4">
              <span class="text-sm font-medium text-gray-900">{{ reward.pointsCost }} points</span>
              <button class="px-4 py-2 text-sm rounded-lg"
                      [ngClass]="{'bg-blue-600 text-white hover:bg-blue-700': reward.available,
                                'bg-gray-100 text-gray-400 cursor-not-allowed': !reward.available}"
                      [disabled]="!reward.available">
                Redeem
              </button>
            </div>
          </div>
        }
        </div>
      </div>

      <!-- History Section -->
      <div class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-xl font-semibold mb-4">Rewards History</h2>
        <div class="space-y-4">
          @for(item of history; track item){
            <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full flex items-center justify-center mr-4"
                   [ngClass]="{'bg-green-100 text-green-600': item.type === 'earned',
                              'bg-blue-100 text-blue-600': item.type === 'redeemed'}">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  @if(item.type === 'earned'){
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  }
                  @if(item.type === 'redeemed'){
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 11l3 3L22 4" />
                  }
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ item.description }}</p>
                <p class="text-xs text-gray-500">{{ item.date }}</p>
              </div>
            </div>
            <span class="text-sm font-medium" 
                  [ngClass]="{'text-green-600': item.type === 'earned',
                             'text-blue-600': item.type === 'redeemed'}">
              {{ item.type === 'earned' ? '+' : '-' }}{{ item.points }} points
            </span>
          </div>
        }
        </div>
      </div>
    </div>
  `,
})
export class RewardsComponent implements OnInit {
  availablePoints = 2750;
  nextRewardThreshold = 5000;
  currentLevel = 12;
  levelProgress = 65;
  currentStreak = 5;

  streakDays = [
    { label: 'M', completed: true },
    { label: 'T', completed: true },
    { label: 'W', completed: true },
    { label: 'T', completed: true },
    { label: 'F', completed: true },
    { label: 'S', completed: false },
    { label: 'S', completed: false }
  ];

  achievements: Achievement[] = [
    {
      name: 'Fast Learner',
      description: 'Complete 5 lessons in one day',
      icon: 'bg-yellow-100 text-yellow-600 bi bi-journal-code',
      dateEarned: '2 days ago'
    },
    {
      name: 'Problem Solver',
      description: 'Solve 10 complex problems',
      icon: 'bg-blue-100 text-blue-600 bi bi-bullseye',
      dateEarned: '1 week ago'
    },
    {
      name: 'Team Player',
      description: 'Help 5 other students',
      icon: 'bg-green-100 text-green-600 bi bi-people',
      dateEarned: '2 weeks ago'
    },
    {
      name: 'Dedicated',
      description: '30-day login streak',
      icon: 'bg-purple-100 text-purple-600 bi bi-graph-up-arrow',
      dateEarned: '1 month ago'
    }
  ];

  rewardOptions: RewardOption[] = [
    {
      title: 'Premium Template Access',
      description: 'Get access to exclusive interview templates',
      pointsCost: 1000,
      category: 'feature',
      available: false
    },
    {
      title: '1-on-1 Mentoring Session',
      description: '30-minute session with an expert',
      pointsCost: 3000,
      category: 'service',
      available: false
    },
    {
      title: '$25 Amazon Gift Card',
      description: 'Redeem points for shopping',
      pointsCost: 5000,
      category: 'gift',
      available: false
    }
  ];

  history: HistoryItem[] = [
    {
      type: 'earned',
      description: 'Completed Daily Challenge',
      points: 100,
      date: 'Today, 2:30 PM'
    },
    {
      type: 'redeemed',
      description: 'Premium Template Access',
      points: 1000,
      date: 'Yesterday, 4:15 PM'
    },
    {
      type: 'earned',
      description: 'Perfect Score Achievement',
      points: 500,
      date: '2 days ago'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}