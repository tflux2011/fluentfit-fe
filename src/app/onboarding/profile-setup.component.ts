import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { BaseResponse, BaseResponseIQ, ProblemEx, Result, SelectableItem } from "../../interfaces/interface";
import { Router } from '@angular/router';
import { PracticeService } from '../services/practice.service';
import { AudioPlayerComponent } from "../audio-player.component";
import { AudioRecorderComponent } from "../audio-recorder.component";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile-setup',
  standalone: true,
  imports: [CommonModule, FormsModule, AudioPlayerComponent, AudioRecorderComponent],
  template: `
    <div class="flex min-h-screen bg-gray-50">
      <!-- Left Side Navigation -->
      <div class="w-1/4 bg-white shadow-lg p-6">
        <h2 class="text-xl font-bold mb-6 text-gray-800">Setup Progress</h2>
        <div class="space-y-4">
          <div 
            class="flex items-center p-3 rounded-lg cursor-pointer transition-all"
            [class.bg-primary-100]="$currentStep() === 1"
            [class.border-l-4]="$currentStep() === 1"
            [class.border-primary-500]="$currentStep() === 1"
            [class.text-primary-700]="$currentStep() === 1"
            [class.bg-green-50]="$currentStep() > 1"
            [class.text-green-700]="$currentStep() > 1"
          >
            <div class="flex-1">
              <p class="font-medium">Tech Stack</p>
              @if($currentStep() > 1) {
                <p class="text-sm">
                  {{ getSelectedCount($stacks()) }} stacks selected
                </p>
              }
            </div>
            @if($currentStep() > 1) {
              <span class="text-green-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
              </span>
            }
          </div>

          <div 
            class="flex items-center p-3 rounded-lg cursor-pointer transition-all"
            [class.bg-primary-100]="$currentStep() === 2"
            [class.border-l-4]="$currentStep() === 2"
            [class.border-primary-500]="$currentStep() === 2"
            [class.text-primary-700]="$currentStep() === 2"
            [class.bg-green-50]="$currentStep() > 2"
            [class.text-green-700]="$currentStep() > 2"
            [class.opacity-50]="$currentStep() < 2"
          >
            <div class="flex-1">
              <p class="font-medium">Languages</p>
              @if($currentStep() > 2) {
                <p class="text-sm">
                  {{ getSelectedCount($languages()) }} languages selected
                </p>
              }
            </div>
            @if($currentStep() > 2) {
              <span class="text-green-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
              </span>
            }
          </div>

          <div 
            class="flex items-center p-3 rounded-lg cursor-pointer transition-all"
            [class.bg-primary-100]="$currentStep() === 3"
            [class.border-l-4]="$currentStep() === 3"
            [class.border-primary-500]="$currentStep() === 3"
            [class.opacity-50]="$currentStep() < 3"
          >
            <div class="flex-1">
              <p class="font-medium">Interview</p>
              <p class="text-sm">Final step</p>
            </div>
          </div>
        </div>
      </div>

    
       <div class="flex-1 p-8">
        <div class="max-w-[800px] mx-auto bg-white rounded-lg shadow-sm p-8"> 
          <!-- Progress Indicator -->
          <div class="mb-8"> <!-- Increased margin bottom -->
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

          <!-- Step 1: Tech Stack -->
          @if($currentStep() === 1) {
            <div class="w-full"> <!-- Added full width -->
              <h2 class="text-2xl font-semibold mb-6 text-gray-800">Select Your Tech Stack</h2>
              <div class="space-y-4"> <!-- Increased spacing -->
                @for (stack of $stacks(); track stack.name) {
                  <div class="flex p-5 border rounded-lg hover:bg-gray-50 transition-colors"> <!-- Increased padding -->
                    <input 
                      type="checkbox" 
                      [checked]="stack.selected"
                      (change)="toggleStack(stack)"
                      [id]="stack.name"
                      class="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                    />
                    <label class="ms-4 flex flex-col flex-1" [htmlFor]="stack.name"> <!-- Added flex-1 -->
                      <span class="text-base font-medium text-gray-900">{{ stack.value }}</span>
                      <span class="text-sm text-gray-500">Popular full-stack choice</span>
                    </label>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Step 2: Languages -->
          @if($currentStep() === 2) {
            <div class="w-full">
              <h2 class="text-2xl font-semibold mb-6 text-gray-800">Select Your Native Language(s)</h2>
              <div class="space-y-4">
                @for (language of $languages(); track language.name) {
                  <div class="flex p-5 border rounded-lg hover:bg-gray-50 transition-colors">
                    <input 
                      type="checkbox" 
                      [checked]="language.selected"
                      (change)="toggleLanguage(language)"
                      [id]="language.name"
                      class="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                    />
                    <label class="ms-4 flex flex-col flex-1" [htmlFor]="language.name">
                      <span class="text-base font-medium text-gray-900">{{ language.name }}</span>
                      <span class="text-sm text-gray-500">Fluent or native speaker</span>
                    </label>
                  </div>
                }
              </div>
            </div>
          }

          <!-- Step 3: Interview -->
          @if($currentStep() === 3) {
            <div class="w-full">
                <button 
                  class="w-full flex justify-between items-center text-xl font-semibold text-gray-800 mb-4"
                  (click)="$showDescription.set(!$showDescription())"
                >
              <h2 class="text-2xl font-semibold mb-6 text-gray-800">Preliminary Interview</h2>
              </button>
              <div class="space-y-6 rounded-lg"> 
                <div class="text-lg font-medium text-gray-900 mb-4">
                  {{$problem().title || "N/A"}}
                </div>
                @if($showDescription()) {
                <div class="space-y-4">
                  <app-audio-player 
                    [src]="$problem().audioFilePath || ''" 
                    [title]="$problem().title" 
                    [isVisual]="false"
                    class="block w-full"
                  />
                  <div class="">
                  <app-audio-recorder  (audioRecorded)="handleAudio($event)"/>  
                  <small class="text-xs">*Click the green dot to record your response</small>
                    
                  </div>
                </div>
                }
                @if($isLoading()) {
                <div class="mt-6 p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div class="flex flex-col items-center">
                    <!-- Brain Processing Animation -->
                    <div class="w-24 h-24 mb-4 relative">
                      <!-- Brain -->
                      <div class="absolute inset-0 animate-pulse">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="text-blue-500">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9">
                          </path>
                        </svg>
                      </div>
                      <!-- Rotating Dots -->
                      <div class="absolute inset-0 animate-spin" style="animation-duration: 3s;">
                        @for(i of [1,2,3,4,5]; track i) {
                          <div 
                            class="absolute w-2 h-2 bg-blue-400 rounded-full"
                            [style.top]="12 + 10 * Math.sin(i * Math.PI * 2 / 5) + 'px'"
                            [style.left]="12 + 10 * Math.cos(i * Math.PI * 2 / 5) + 'px'"
                          ></div>
                        }
                      </div>
                    </div>
                    
                    <!-- Loading Text Animation -->
                    <div class="text-lg font-semibold text-gray-700 mb-2">Analyzing Your Response</div>
                    <div class="flex items-center space-x-1 text-blue-500">
                      <div class="animate-bounce" style="animation-delay: 0ms">🤔</div>
                      <div class="animate-bounce" style="animation-delay: 100ms">💭</div>
                      <div class="animate-bounce" style="animation-delay: 200ms">💡</div>
                      <div class="animate-bounce" style="animation-delay: 300ms">✨</div>
                    </div>
                    
                    <!-- Random Loading Messages -->
                    <div class="mt-4 text-sm text-gray-500 text-center">
                      {{ $loadingMessage() }}
                    </div>
                  </div>
                </div>
                }
                 <!-- Results Section -->
              @if($result(); as res) {
                <div class="mt-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 class="text-lg font-semibold mb-4">Your Performance</h3>
                  
                  <!-- Score -->
                  <div class="mb-6">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm font-medium">Overall Score</span>
                      <span class="text-lg font-bold text-blue-700">{{ res?.data?.score }}/5</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        class="bg-blue-700 h-2.5 rounded-full" 
                        [style.width]="(res?.data?.score ?? 0) / 5 * 100 + '%'"
                      ></div>
                    </div>
                  </div>

                  <!-- AI Analysis -->
                  <div class="space-y-3">
                    <div class="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                      <svg class="w-4 h-4 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <div>
                        <div class="font-medium text-sm">Response</div>
                        <div class="text-sm text-gray-600">{{ res?.data?.response }}</div>
                      </div>
                    </div>

                    @if(res?.data?.analysis) {
                      <div class="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                        <svg class="w-4 h-4 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                          <div class="font-medium text-sm">Clarity</div>
                          <div class="text-sm text-gray-600">{{ res?.data?.analysis?.clarity }}</div>
                        </div>
                      </div>

                      <div class="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                        <svg class="w-4 h-4 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                          <div class="font-medium text-sm">Relevance</div>
                          <div class="text-sm text-gray-600">{{ res?.data?.analysis?.relevance }}</div>
                        </div>
                      </div>

                      <div class="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                        <svg class="w-4 h-4 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                          <div class="font-medium text-sm">Technical Accuracy</div>
                          <div class="text-sm text-gray-600">{{ res?.data?.analysis?.technicalAccuracy }}</div>
                        </div>
                      </div>

                      <div class="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                        <svg class="w-4 h-4 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <div>
                          <div class="font-medium text-sm">Grammar</div>
                          <div class="text-sm text-gray-600">{{ res?.data?.analysis?.grammar }}</div>
                        </div>
                      </div>

                      @if(res?.data?.analysis?.pronunciation) {
                        <div class="flex items-start space-x-2 p-3 bg-gray-50 rounded-lg">
                          <svg class="w-4 h-4 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <div>
                            <div class="font-medium text-sm">Pronunciation</div>
                            <div class="text-sm text-gray-600">{{ res?.data?.analysis?.pronunciation }}</div>
                          </div>
                        </div>
                      }
                    }
                  </div>

                  <!-- Response Recording -->
                  @if(res?.data?.location) {
                    <div class="mt-4">
                      <h4 class="text-sm font-medium mb-2">Your Response</h4>
                      <div class="p-3 bg-gray-50 rounded-lg">
                        <audio controls class="w-full" [src]="res?.data?.location"></audio>
                      </div>
                    </div>
                  }
                </div>
              }
              </div>
            </div>
          }

          <div class="flex justify-between mt-8">
      @if($currentStep() > 1) {
        <button 
          (click)="goBack()"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary rounded-lg border border-gray-200 text-sm font-medium px-6 py-3 hover:text-gray-900"
        >
          Back
        </button>
      }
      @if($currentStep() < 3) {
        <button 
          (click)="goNext()"
          [disabled]="!canProceedToNextStep()"
          class="text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-6 py-3 text-center"
          [class.ml-auto]="$currentStep() > 1"
          [class.opacity-50]="!canProceedToNextStep()"
        >
          Next
        </button>
      } @else {
        @if($showDescription()) {
        <button 
          (click)="submitResponse()"
          class="text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-6 py-3 text-center ml-auto"
        >
          Submit Response
        </button>
        }@else{
        <button 
          (click)="completeOnboarding()"
          class="text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-6 py-3 text-center ml-auto"
        >
          Complete Setup
        </button>
        }
      }

      @if ($error()) {
        <div class="absolute bottom-4 right-4 bg-red-100 text-red-700 p-4 rounded-lg">
          {{ $error() }}
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProfileSetupComponent {
  initialValue: ProblemEx = 
    {
      _id: '',
      title: '',
      question: '',
      questionType: '',
      difficulty: 0,
      audioFilePath: '',
      exampleAnswer: '',
      stack: '',
    }
  ;
  
  #auth = inject(AuthService);
  $isLoading = signal(false);
  $loadingMessage = signal('');
  protected Math = Math;
  audioBlob!: Blob;
  code!: string;
  $showDescription = signal(true);
  
  private loadingMessages = [
    "Evaluating technical accuracy... 🔍",
    "Analyzing grammar patterns... 📝",
    "Processing pronunciation... 🗣️",
    "Checking response relevance... 🎯",
    "Computing clarity score... 💫",
    "Generating helpful feedback... 💭",
    "Running AI analysis... 🤖",
    "Calculating performance metrics... 📊"
  ];
  
  private loadingMessageInterval: any;
  
  private rotateLoadingMessage() {
    const messages = [...this.loadingMessages];
    this.loadingMessageInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      this.$loadingMessage.set(messages[randomIndex]);
    }, 2000);
  }

  handleAudio(audio: Blob) {
    this.audioBlob = audio; 
  }

  handleCode(code: string) {
    this.code = code; 
  }
  $currentStep = signal(1);
  $problem = signal<ProblemEx>(this.initialValue);
  #userService = inject(CommonService);
  #router = inject(Router);
  #practice = inject(PracticeService);
  $error = signal<string>('');
  $isSubmitting = signal<boolean>(false);
  $result = signal<Result | null>(null);

  $stacks = signal<SelectableItem[]>([
    { value: 'MEAN (MongoDB, Express, Angular Node)', name: 'MEAN', selected: false },
    { value: 'MERN (MongoDB, Express, React, Node)', name: 'MERN', selected: false },
    { value: 'LEMP (Linux, NGINX, MySQL, PHP)', name: 'LEMP', selected: false },
    { value: 'LAMP (Linux, Apache, MySQL, PHP)', name: 'LAMP', selected: false },
  ]);

  $languages = signal<SelectableItem[]>([
    { name: 'English', value: '', selected: false },
    { name: 'Spanish', value: '', selected: false },
    { name: 'French', value: '', selected: false },
  ]);

  $answers = signal<Record<string, string>>({});

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

  handleAnswerChange(questionId: string, value: string) {
    this.$answers.update(answers => ({
      ...answers,
      [questionId]: value
    }));
  }

  getSelectedCount(items: SelectableItem[]): number {
    return items.filter(item => item.selected).length;
  }

  canProceedToNextStep(): boolean {
    switch (this.$currentStep()) {
      case 1:
        return this.$stacks().some(stack => stack.selected);
      case 2:
        return this.$languages().some(lang => lang.selected);
      default:
        return true;
    }
  }

  async goNext() {
    if (!this.canProceedToNextStep()) {
      this.$error.set('Please make at least one selection before proceeding');
      setTimeout(() => this.$error.set(''), 3000);
      return;
    }

    if (this.$currentStep() === 2) {
      // Submit first two steps before proceeding to interview
      await this.submitInitialSteps();
    } else if (this.$currentStep() < 3) {
      this.$currentStep.update(step => step + 1);
    }
  }

  private async submitInitialSteps() {
    try {
      this.$isSubmitting.set(true);
      this.$error.set('');

      const selectedStacks = this.$stacks()
        .filter(stack => stack.selected)
        .map(stack => stack.name);
        
      const selectedLanguages = this.$languages()
        .filter(lang => lang.selected)
        .map(lang => lang.name);

      const payload = {
        selectedStacks,
        languagePreference: selectedLanguages
      };

      this.#userService.handleUserUpdate(payload).subscribe((res:BaseResponse) => {
        if(res.isSuccess){
          this.$currentStep.update(step => step + 1);
          this.loadProblem();
        }else {
          throw new Error('Failed to save preferences');
        }
      });
      
    } catch (error) {
      this.$error.set('Failed to save your preferences. Please try again.');
      setTimeout(() => this.$error.set(''), 3000);
    } finally {
      this.$isSubmitting.set(false);
    }
  }


  goBack() {
    if (this.$currentStep() > 1) {
      this.$currentStep.update(step => step - 1);
    }
  }
  constructor(){
    effect(()=>{
      this.loadProblem();
    })
  }

   // Modified complete onboarding to only handle interview completion
   submitResponse() {
      const formData = new FormData();
      formData.append('audio', this.audioBlob, 'audio.mp3');
      this.$isLoading.set(true);
      this.$loadingMessage.set(this.loadingMessages[0]);
      this.rotateLoadingMessage();
  
      const problem_id = this.$problem()?._id || '';
      this.#practice.submitProblem(formData, problem_id).subscribe({
        next: (res: Result) => {
          if (res) {
            clearInterval(this.loadingMessageInterval);
            this.$isLoading.set(false);
            this.$result.set(res);
            this.$showDescription.set(false);
            this.#auth.updateUser(res?.user || {});
          }
        },
        error: (error) => {
          clearInterval(this.loadingMessageInterval);
          this.$isLoading.set(false);
          console.error('Error submitting practice:', error);
        }
      });
  }

  completeOnboarding(){
    this.#router.navigate(['/dashboard']);
  }

  loadProblem() {
    this.#practice.getProblemByStack(1).subscribe({
      next: (res: BaseResponseIQ) => {
        if (res.data) {
          this.$problem.set(res.data[0] as ProblemEx);
          // console.log(res.data[0].title)
          // console.log(res.data[0]);
        } else {
          console.error("No data in response:", res);
        }
      },
      error: (err) => console.error("Failed to load problem:", err),
    });
  }
}