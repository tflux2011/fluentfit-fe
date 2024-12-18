import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { BaseResponse, IUserProfileSetup,SelectableItem } from "../../interfaces/interface";
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
template: `
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-md bg-white shadow-sm rounded-lg p-6">
      <!-- Progress Indicator -->
      <div class="mb-6">
        <div class="flex justify-between text-sm text-gray-500 mb-2">
          <span>Step {{ $currentStep() }} of 3</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            class="bg-primary h-1.5 rounded-full transition-all duration-300" 
            [style.width.%]="($currentStep() / 3) * 100"
          ></div>
        </div>
      </div>

      <!-- Step 1: Select Tech Stack -->
      @if($currentStep() === 1) {
        <div>
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Select Your Tech Stack</h2>
          <div class="space-y-3">
            @for (stack of $stacks(); track stack.name) {
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  [checked]="stack.selected"
                  (change)="toggleStack(stack)"
                  [id]="stack.name"
                  class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                />
                <label class="ms-2 text-sm font-medium text-gray-900" [htmlFor]="stack.name">
                  {{ stack.value }}
                </label>
              </div>
            }
          </div>
        </div>
      }

      <!-- Step 2: Select Languages -->
      @if($currentStep() === 2) {
        <div>
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Select Your Native Language(s)</h2>
          <div class="space-y-3">
            @for (language of $languages(); track language.name) {
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  [checked]="language.selected"
                  (change)="toggleLanguage(language)"
                  [id]="language.name"
                  class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                />
                <label class="ms-2 text-sm font-medium text-gray-900" [htmlFor]="language.name">
                  {{ language.name }}
                </label>
              </div>
            }
          </div>
        </div>
      }

      <!-- Step 3: Finalize -->
      @if($currentStep() === 3) {
        <div>
          <h2 class="text-xl font-semibold mb-4 text-gray-800">Complete Onboarding</h2>
          <button 
            (click)="completeOnboarding()"
            class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Finish Setup
          </button>
        </div>
      }

      <!-- Navigation Buttons -->
      @if($currentStep() < 3) {
        <div class="flex justify-between mt-6">
          @if($currentStep() > 1) {
            <button 
              (click)="goBack()"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
            >
              Back
            </button>
          }
          <button 
            (click)="goNext()"
            class="text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-auto"
          >
            Next
          </button>
        </div>
      }
    </div>
  </div>
  `,
  styles: []
})
export class ProfileSetupComponent {
  // Signals for reactive state management
  $currentStep = signal(1);
  #userService = inject(CommonService);
  #router = inject(Router)

  // Signals for stacks and languages
  $stacks = signal<SelectableItem[]>([
    { value: 'MEAN (MongoDB, Express, Angular Node)', name: 'MEAN', selected: false },
    { value: 'MERN (MongoDB, Express, React, Node)',  name: 'MERN', selected: false },
    { value: 'LEMP (Linux, NGINX, MySQL, PHP)', name: 'LEMP', selected: false },
    { value: 'LAMP (Linux, Apache, MySQL, PHP)', name: 'LAMP', selected: false },
  ]);

  $languages = signal<SelectableItem[]>([
    { name: 'English', value:"", selected: false },
    { name: 'Spanish', value:"", selected: false },
    { name: 'French', value:"", selected: false },
  ]);

  // Toggle methods for stack and language selection
  toggleStack(stack: SelectableItem) {
    this.$stacks.update(stacks => 
      stacks.map(s => 
        s.name === stack.name ? { ...s, selected: !s.selected } : s
      )
    );
  }

  toggleLanguage(language: SelectableItem) {
    this.$languages.update(languages => 
      languages.map(l => 
        l.name === language.name ? { ...l, selected: !l.selected } : l
      )
    );
  }

  // Navigation methods
  goNext() {
    if (this.$currentStep() < 3) {
      this.$currentStep.update(step => step + 1);
    }
  }

  goBack() {
    if (this.$currentStep() > 1) {
      this.$currentStep.update(step => step - 1);
    }
  }

  // Onboarding completion method
  completeOnboarding() {
    const selectedStacks = this.$stacks().filter(stack => stack.selected).map(stack => stack.name);
    const selectedLanguages = this.$languages().filter(lang => lang.selected).map(lang => lang.name);

    const payload = {
      selectedStacks: selectedStacks,
      languagePreference: selectedLanguages
    };

    // Add your final onboarding logic here
    this.#userService.handleUserUpdate(payload).subscribe((res:BaseResponse) => {
      if(res.isSuccess){
        this.#router.navigate(['dashboard/practise']);
        console.log(res.isSuccess)
      }
    })
  }
}