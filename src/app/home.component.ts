import { Component } from '@angular/core';
import { HeroComponent } from './hero.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, RouterLink],
  template: `
     <app-hero />
     <section class="bg-white dark:bg-gray-900">
        <div class="py-16 px-4 mx-auto max-w-screen-xl lg:py-24 lg:px-6">
            <!-- Enhanced Header Section -->
            <div class="max-w-screen-md mb-12 lg:mb-20 mx-auto text-center">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Why Choose <span class="text-primary">FluentFit</span>?
                </h2>
                <p class="text-gray-500 sm:text-xl dark:text-gray-400 lg:px-8">
                    FluentFit empowers non-native English speakers to excel in technical interviews with confidence. Experience the perfect blend of AI-powered coaching and personalized learning.
                </p>
            </div>

            <!-- Enhanced Features Grid -->
            <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 xl:gap-16 md:space-y-0">
                <!-- Real-Time AI Feedback -->
                <div class="relative p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300">
                    <div class="flex justify-center items-center mb-6 w-12 h-12 rounded-lg bg-green-100 lg:h-14 lg:w-14 dark:bg-green-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-green-600 dark:text-green-300" viewBox="0 0 16 16">
                            <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                        </svg>
                    </div>
                    <h3 class="mb-3 text-xl font-bold dark:text-white">Real-Time AI Feedback</h3>
                    <p class="text-gray-500 dark:text-gray-400">Get instant, actionable feedback to improve clarity, grammar, and technical accuracy. Our AI analyzes your responses in real-time, providing precise guidance for better communication.</p>
                </div>

                <!-- Pronunciation Master -->
                <div class="relative p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300">
                    <div class="flex justify-center items-center mb-6 w-12 h-12 rounded-lg bg-purple-100 lg:h-14 lg:w-14 dark:bg-purple-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-purple-600 dark:text-purple-300" viewBox="0 0 16 16">
                            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0z"/>
                        </svg>
                    </div>
                    <h3 class="mb-3 text-xl font-bold dark:text-white">Master Pronunciation</h3>
                    <p class="text-gray-500 dark:text-gray-400">Perfect your speech with AI-powered pronunciation feedback. Our advanced system helps you refine your accent and improve fluency for clear, confident communication.</p>
                </div>

                <!-- Tailored Questions -->
                <div class="relative p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300">
                    <div class="flex justify-center items-center mb-6 w-12 h-12 rounded-lg bg-green-100 lg:h-14 lg:w-14 dark:bg-green-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-green-600 dark:text-green-300" viewBox="0 0 16 16">
                            <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z"/>
                            <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </div>
                    <h3 class="mb-3 text-xl font-bold dark:text-white">Tailored Questions</h3>
                    <p class="text-gray-500 dark:text-gray-400">Practice with questions customized for your tech stack and experience level. From React to Python, we've got you covered with industry-specific scenarios.</p>
                </div>

                <!-- Progress Tracking -->
                <div class="relative p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300">
                    <div class="flex justify-center items-center mb-6 w-12 h-12 rounded-lg bg-red-100 lg:h-14 lg:w-14 dark:bg-red-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-red-600 dark:text-red-300" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </div>
                    <h3 class="mb-3 text-xl font-bold dark:text-white">Track Progress</h3>
                    <p class="text-gray-500 dark:text-gray-400">Monitor your improvement with detailed analytics. Watch your communication skills evolve through comprehensive performance metrics and insights.</p>
                </div>

                <!-- Global Support -->
                <div class="relative p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300">
                    <div class="flex justify-center items-center mb-6 w-12 h-12 rounded-lg bg-yellow-100 lg:h-14 lg:w-14 dark:bg-yellow-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-yellow-600 dark:text-yellow-300" viewBox="0 0 16 16">
                            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5z"/>
                        </svg>
                    </div>
                    <h3 class="mb-3 text-xl font-bold dark:text-white">Global Support</h3>
                    <p class="text-gray-500 dark:text-gray-400">Built for international professionals. Navigate cultural nuances and master professional English communication with confidence.</p>
                </div>

                <!-- Flexible Practice -->
                <div class="relative p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300">
                    <div class="flex justify-center items-center mb-6 w-12 h-12 rounded-lg bg-indigo-100 lg:h-14 lg:w-14 dark:bg-indigo-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="text-indigo-600 dark:text-indigo-300" viewBox="0 0 16 16">
                            <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2z"/>
                        </svg>
                    </div>
                    <h3 class="mb-3 text-xl font-bold dark:text-white">Flexible Practice</h3>
                    <p class="text-gray-500 dark:text-gray-400">Practice anytime, anywhere. Access FluentFit on any device and maintain consistent progress towards your interview goals.</p>
                </div>
            </div>
        </div>
     </section>
         <!-- Statistics Section -->
    <section class="bg-green-50 dark:bg-gray-800">
      <div class="py-16 px-4 mx-auto max-w-screen-xl lg:py-24 lg:px-6">
        <div class="max-w-screen-lg mx-auto text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Software Engineers Worldwide
          </h2>
          <p class="text-gray-600 dark:text-gray-400">Our platform has helped countless engineers land their dream jobs</p>
        </div>
        
        <div class="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">95%</div>
            <div class="text-gray-600 dark:text-gray-300">Success Rate</div>
          </div>
          <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">50K+</div>
            <div class="text-gray-600 dark:text-gray-300">Active Users</div>
          </div>
          <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">200+</div>
            <div class="text-gray-600 dark:text-gray-300">Tech Companies</div>
          </div>
          <div class="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">25+</div>
            <div class="text-gray-600 dark:text-gray-300">Languages Supported</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="bg-white dark:bg-gray-900">
      <div class="py-16 px-4 mx-auto max-w-screen-xl lg:py-24 lg:px-6">
        <div class="max-w-screen-lg mx-auto text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How FluentFit Works
          </h2>
          <p class="text-gray-600 dark:text-gray-400">Get interview-ready in three simple steps</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="flex justify-center mb-4">
              <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span class="text-xl font-bold text-green-600 dark:text-green-400">1</span>
              </div>
            </div>
            <h3 class="text-xl font-bold mb-2 dark:text-white">Create Your Profile</h3>
            <p class="text-gray-600 dark:text-gray-400">Select your tech stack, experience level, and target companies</p>
          </div>
          <div class="text-center">
            <div class="flex justify-center mb-4">
              <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span class="text-xl font-bold text-green-600 dark:text-green-400">2</span>
              </div>
            </div>
            <h3 class="text-xl font-bold mb-2 dark:text-white">Practice Interviews</h3>
            <p class="text-gray-600 dark:text-gray-400">Get AI-powered feedback on your technical and language skills</p>
          </div>
          <div class="text-center">
            <div class="flex justify-center mb-4">
              <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span class="text-xl font-bold text-green-600 dark:text-green-400">3</span>
              </div>
            </div>
            <h3 class="text-xl font-bold mb-2 dark:text-white">Track Progress</h3>
            <p class="text-gray-600 dark:text-gray-400">Monitor your improvement and readiness for real interviews</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="bg-gray-50 dark:bg-gray-800">
      <div class="py-16 px-4 mx-auto max-w-screen-xl lg:py-24 lg:px-6">
        <div class="max-w-screen-lg mx-auto text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Success Stories
          </h2>
          <p class="text-gray-600 dark:text-gray-400">Hear from engineers who landed their dream jobs</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <div class="flex items-center mb-4">
              <img class="w-12 h-12 rounded-full" src="avatar.webp" alt="User avatar">
              <div class="ml-4">
                <h4 class="font-bold dark:text-white">Samson K</h4>
                <p class="text-gray-600 dark:text-gray-400">Software Engineer at Google</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400">Thanks to FluentFit, I felt fully prepared for my technical interviews. The dynamic questions tailored to my stack made a huge difference!</p>
          </div>
          <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <div class="flex items-center mb-4">
              <img class="w-12 h-12 rounded-full" src="avatar.webp" alt="User avatar">
              <div class="ml-4">
                <h4 class="font-bold dark:text-white">Louis K</h4>
                <p class="text-gray-600 dark:text-gray-400">Software Engineer at Google</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400">"FluentFit has been a game-changer! The personalized feedback helped me refine my answers and boosted my confidence during interviews"</p>
          </div>
          <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <div class="flex items-center mb-4">
              <img class="w-12 h-12 rounded-full" src="avatar.webp" alt="User avatar">
              <div class="ml-4">
                <h4 class="font-bold dark:text-white">Kang K</h4>
                <p class="text-gray-600 dark:text-gray-400">Software Engineer at Google</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400">"FluentFit helped me overcome my language barrier and ace my technical interviews. The AI feedback was incredibly helpful!"</p>
          </div>
          <!-- More testimonials -->
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-primary dark:bg-green-900">
      <div class="py-16 px-4 mx-auto max-w-screen-xl lg:py-24 lg:px-6">
        <div class="max-w-screen-lg mx-auto text-center">
          <h2 class="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Interview Skills?
          </h2>
          <p class="text-green-100 mb-8">Start practicing today with our free trial</p>
          <div class="flex justify-center space-x-4">
            <a [routerLink]="['sign-up']" class="bg-white text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-medium transition duration-300">
              Get Started
            </a>
            <a [routerLink]="['how-it-works']" class="text-white border border-white hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition duration-300">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="bg-white dark:bg-gray-900">
      <div class="py-16 px-4 mx-auto max-w-screen-xl lg:py-24 lg:px-6">
        <div class="max-w-screen-lg mx-auto text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p class="text-gray-600 dark:text-gray-400">Find answers to common questions about FluentFit</p>
        </div>

        <div class="max-w-screen-md mx-auto divide-y dark:divide-gray-700">
          <div class="py-6">
            <details class="group">
              <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                <span class="text-gray-900 dark:text-white">What is FluentFit?</span>
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p class="text-gray-600 dark:text-gray-400 mt-3">
              FluentFit is an AI-powered interview coach designed to help non-native English speakers excel in technical job interviews by offering tailored question sets, feedback, and performance evaluations.
              </p>
            </details>
          </div>
          <div class="py-6">
            <details class="group">
              <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                <span class="text-gray-900 dark:text-white">Who is FluentFit for?</span>
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p class="text-gray-600 dark:text-gray-400 mt-3">
              FluentFit is ideal for software engineers, particularly non-native English speakers, looking to improve their interview skills in both technical and communication areas.
              </p>
            </details>
          </div>
          <div class="py-6">
            <details class="group">
              <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                <span class="text-gray-900 dark:text-white">How does FluentFit personalize questions?</span>
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p class="text-gray-600 dark:text-gray-400 mt-3">
              FluentFit dynamically generates questions based on your selected technology stack, experience level, and preferences.
              </p>
            </details>
          </div>
          <div class="py-6">
            <details class="group">
              <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
                <span class="text-gray-900 dark:text-white">Can FluentFit help me improve my spoken English?</span>
                <span class="transition group-open:rotate-180">
                  <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <p class="text-gray-600 dark:text-gray-400 mt-3">
              Yes! FluentFit provides pronunciation feedback, grammar corrections, and tailored suggestions to help improve your spoken English during interviews.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HomeComponent {
}