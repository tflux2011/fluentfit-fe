import { Component } from '@angular/core';
import { PageHeaderComponent } from './page-header.component';

@Component({
  selector: 'app-testimonials',
  imports: [PageHeaderComponent],
  template: `
   <app-page-header page_title="Testimonials"/>
   <section class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <div class="max-w-screen-md mb-8 lg:mb-16">
        <h2 class="mb-4 text-4xl font-bold text-gray-900">What Our Users Say</h2>
        <p class="text-gray-600 sm:text-xl">Success stories from developers who landed their dream jobs</p>
      </div>
      <div class="grid gap-8 lg:grid-cols-3">
        <article class="p-6 bg-white rounded-lg border border-gray-200">
          <div class="flex items-center mb-4">
            <img class="w-10 h-10 rounded-full" src="avatar.webp" alt="Avatar">
            <div class="ml-4">
              <h4 class="text-lg font-bold text-gray-900">Maria S.</h4>
              <p class="text-gray-600">Software Engineer at Google</p>
            </div>
          </div>
          <p class="text-gray-600">"FluentFit helped me overcome my language barrier and ace my technical interviews. The AI feedback was incredibly helpful!"</p>
        </article>
        <article class="p-6 bg-white rounded-lg border border-gray-200">
          <div class="flex items-center mb-4">
            <img class="w-10 h-10 rounded-full" src="avatar.webp" alt="Avatar">
            <div class="ml-4">
              <h4 class="text-lg font-bold text-gray-900">Louis O.</h4>
              <p class="text-gray-600">Software Engineer at Facebook</p>
            </div>
          </div>
          <p class="text-gray-600">"FluentFit has been a game-changer! The personalized feedback helped me refine my answers and boosted my confidence during interviews"</p>
        </article>
        <article class="p-6 bg-white rounded-lg border border-gray-200">
          <div class="flex items-center mb-4">
            <img class="w-10 h-10 rounded-full" src="avatar.webp" alt="Avatar">
            <div class="ml-4">
              <h4 class="text-lg font-bold text-gray-900">Samson K.</h4>
              <p class="text-gray-600">Software Engineer at SSDA</p>
            </div>
          </div>
          <p class="text-gray-600">"Thanks to FluentFit, I felt fully prepared for my technical interviews. The dynamic questions tailored to my stack made a huge difference!"</p>
        </article>
        <!-- Add more testimonials similarly -->
      </div>
    </section>
  `,
  styles: ``
})
export class TestimonialsComponent {

}
