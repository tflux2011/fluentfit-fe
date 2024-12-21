import { Component } from '@angular/core';
import { PageHeaderComponent } from "./page-header.component";

@Component({
  selector: 'app-pricing',
  imports: [PageHeaderComponent],
  template: `
  <app-page-header page_title="How it works"/>
    <section class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div class="max-w-screen-md mb-8 lg:mb-16 text-center mx-auto">
        <h2 class="mb-4 text-4xl font-bold text-gray-900">Choose Your Plan</h2>
        <p class="text-gray-600 sm:text-xl">Start with our free plan or upgrade for advanced features</p>
      </div>
      <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
        <!-- Free Plan -->
        <div class="flex flex-col p-6 mx-auto w-full text-center bg-white rounded-lg border border-gray-200 shadow">
          <h3 class="mb-4 text-2xl font-bold">Free</h3>
          <p class="font-light text-gray-600 sm:text-lg">Best for getting started</p>
          <div class="flex justify-center items-baseline my-8">
            <span class="mr-2 text-5xl font-bold">$0</span>
            <span class="text-gray-600">/month</span>
          </div>
          <ul class="mb-8 space-y-4 text-left">
            <li class="flex items-center space-x-3">
              <svg class="flex-shrink-0 w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>5 practice interviews/month</span>
            </li>
            <!-- Add more features -->
          </ul>
          <button class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Get started</button>
        </div>
        <!-- Add Pro and Enterprise plans similarly -->
      </div>
    </section>
  `,
  styles: ``
})
export class PricingComponent {

}
