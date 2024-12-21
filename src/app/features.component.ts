import { Component } from '@angular/core';
import { PageHeaderComponent } from './page-header.component';

@Component({
  selector: 'app-features',
  imports: [PageHeaderComponent],
  template: `
    <app-page-header page_title="Features"/>
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div class="max-w-screen-md mb-8 lg:mb-16">
        <h2 class="mb-4 text-4xl font-bold text-gray-900">Features designed for your success</h2>
        <p class="text-gray-600 sm:text-xl">Our AI-powered platform helps you master technical interviews in English with confidence.</p>
      </div>
      <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0">
        <div class="p-6 bg-white rounded-lg border border-gray-200">
          <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-green-100 lg:h-12 lg:w-12">
            <svg class="w-5 h-5 text-green-600 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/></svg>
          </div>
          <h3 class="mb-2 text-xl font-bold">AI-Powered Practice</h3>
          <p class="text-gray-600">Dynamic generation of technical questions based on your stack and experience level.</p>
        </div>
        <div class="p-6 bg-white rounded-lg border border-gray-200">
          <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-green-100 lg:h-12 lg:w-12">
            <i class="bi bi-alarm-fill text-lg text-green-600"></i>
          </div>
          <h3 class="mb-2 text-xl font-bold">Real-time Evaluation</h3>
          <p class="text-gray-600">Real-time evaluation of interview responses for clarity, grammar, and technical accuracy.</p>
        </div>
        <div class="p-6 bg-white rounded-lg border border-gray-200">
          <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-green-100 lg:h-12 lg:w-12">
            <i class="bi bi-person text-lg text-green-600"></i>
          </div>
          <h3 class="mb-2 text-xl font-bold">Personalized Feedback:</h3>
          <p class="text-gray-600">Personalized feedback on pronunciation, vocabulary, and communication skills.</p>
        </div>
        <div class="p-6 bg-white rounded-lg border border-gray-200">
          <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-green-100 lg:h-12 lg:w-12">
            <i class="bi bi-feather text-green-600 text-lg"></i>
          </div>
          <h3 class="mb-2 text-xl font-bold">Flexible Practice Modes</h3>
          <p class="text-gray-600">Guided and free practice modes for flexible interview preparation.</p>
        </div>
        <div class="p-6 bg-white rounded-lg border border-gray-200">
          <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-green-100 lg:h-12 lg:w-12">
            <i class="bi bi-controller text-green-600 text-lg"></i>
          </div>
          <h3 class="mb-2 text-xl font-bold">Gamified Progress Tracking</h3>
          <p class="text-gray-600">Gamified progress tracking with badges and improvement suggestions.</p>
        </div>
        <!-- Add more feature cards similarly -->
      </div>
    </div>
  `,
  styles: ``
})
export class FeaturesComponent {

}
