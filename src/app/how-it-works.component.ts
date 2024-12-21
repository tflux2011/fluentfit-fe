import { Component } from '@angular/core';
import { PageHeaderComponent } from "./page-header.component";

@Component({
  selector: 'app-how-it-works',
  imports: [PageHeaderComponent],
  template: `
    <app-page-header page_title="How it works"/>
    <section class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div class="max-w-screen-md mb-8 lg:mb-16">
        <h2 class="mb-4 text-4xl font-bold text-gray-900">How FluentFit Works</h2>
        <p class="text-gray-600 sm:text-xl">Master technical interviews in 3 simple steps</p>
      </div>
      <div class="space-y-8 md:grid md:grid-cols-3 md:gap-12 md:space-y-0">
        <div class="flex flex-col items-center">
          <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-green-100">
            <span class="text-2xl font-bold text-green-600">1</span>
          </div>
          <h3 class="mb-2 text-xl font-bold text-center">Choose Your Stack</h3>
          <p class="text-center text-gray-600">Select your programming languages and frameworks to get personalized practice.</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-green-100">
            <span class="text-2xl font-bold text-green-600">2</span>
          </div>
          <h3 class="mb-2 text-xl font-bold text-center">Choose Your Language</h3>
          <p class="text-center text-gray-600">Select the languages you speak.</p>
        </div>
        <div class="flex flex-col items-center">
          <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-green-100">
            <span class="text-2xl font-bold text-green-600">3</span>
          </div>
          <h3 class="mb-2 text-xl font-bold text-center">Take Preliminary Test</h3>
          <p class="text-center text-gray-600">Take your first test so we can adjust your speaking level.</p>
        </div>
      </div>
    </section>
  `,
  styles: ``
})
export class HowItWorksComponent {

}
