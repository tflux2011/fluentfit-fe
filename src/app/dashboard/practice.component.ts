import { Component, signal, ViewChild, ElementRef, AfterViewInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioPlayerComponent } from '../audio-player.component';
import { AudioRecorderComponent } from "../audio-recorder.component";
import { PracticeService } from '../services/practice.service';
import { BaseResponse, ProblemEx } from '../../interfaces/interface';
import { CodeEditorComponent } from "../app-code-editor";
import { PromptComponent } from '../utils/prompt.component';
import { Result } from '../../interfaces/interface';
import { AuthService } from '../services/auth.service';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  tags: string[];
  videoUrl?: string;
}

interface Feedback {
  clarity: string;
  relevance: string;
  pronunciation: string | null;
  grammar: string;
  technicalAccuracy: string;
  location: string;
}

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule, FormsModule, AudioPlayerComponent, AudioRecorderComponent, CodeEditorComponent, PromptComponent],
  template: `
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <div class="w-72 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 class="text-xl font-bold text-gray-800 mb-6">Problem Set</h2>
      
      <!-- Problem Filters -->
      <div class="mb-4">
        <div class="flex flex-wrap gap-2 p-2 bg-white rounded-lg shadow-sm">
          @for(diff of qTypes; track diff.key) {
            <button 
              (click)="toggleDifficultyFilter(diff.key)"
              class="px-3 py-1 rounded-full text-xs font-medium transition-colors"
              [class.bg-blue-700]="selectedDifficulties().includes(diff.key)"
              [class.text-white]="selectedDifficulties().includes(diff.key)"
              [class.bg-gray-200]="!selectedDifficulties().includes(diff.key)"
              [class.text-gray-700]="!selectedDifficulties().includes(diff.key)"
            >
              {{ diff.name }}
            </button>
          }
        </div>
      </div>

      <!-- Problem List -->
      <div class="space-y-2">
        @for(problem of filteredProblems(); track problem._id) {
          <div 
            (click)="selectProblem(problem)"
            class="cursor-pointer p-3 rounded-lg transition-colors"
            [class.bg-green-50]="$selectedProblem()?._id === problem._id"
            [class.border-green-200]="$selectedProblem()?._id === problem._id"
            [class.border]="$selectedProblem()?._id === problem._id"
            [class.hover:bg-gray-100]="$selectedProblem()?._id !== problem._id"
          >
            <div class="flex justify-between items-center">
              <span class="font-medium text-gray-800">{{ problem.title }}</span>
            </div>
            <div class="mt-1 flex space-x-1">
              <span class="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                {{ problem.questionType }}
              </span>
            </div>
          </div>
        }
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col">
      @if($selectedProblem(); as problem) {
        <!-- Problem Header -->
        <div class="p-6 bg-white border-b border-gray-200">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ problem.title }}</h1>
          <div class="flex items-center space-x-3">
            <span class="text-sm">Difficulty:</span>
            <span 
              class="px-2.5 py-0.5 rounded-full text-xs font-medium"
              [class.bg-green-100]="problem.difficulty === 1"
              [class.text-green-800]="problem.difficulty === 1"
              [class.bg-yellow-100]="problem.difficulty === 2"
              [class.text-yellow-800]="problem.difficulty === 2"
              [class.bg-red-100]="problem.difficulty === 3"
              [class.text-red-800]="problem.difficulty === 3"
            >
              {{ getDifficultyLabel(problem.difficulty) }}
            </span>
            <span class="text-gray-500 text-sm">Stack: {{ problem.stack }}</span>
          </div>
        </div>

        <!-- Content Area -->
        <div class="flex-1 flex">
          <!-- Left Panel -->
          <div class="w-1/2 flex flex-col">
            <div class="flex-1 p-6 bg-white border-r border-gray-200 overflow-y-auto">
              <!-- Problem Description Section -->
              <div class="mb-6">
                <button 
                  class="w-full flex justify-between items-center text-xl font-semibold text-gray-800 mb-4"
                  (click)="$showDescription.set(!$showDescription())"
                >
                  <span>Problem Description</span>
                  <svg 
                    class="w-5 h-5 transition-transform"
                    [class.rotate-180]="!$showDescription()"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                @if($showDescription()) {
                  <p class="text-gray-600 mb-4">
                    Listen to the audio below to answer the question and record your explanation.
                  </p>

                  @if(problem.audioFilePath) {
                    <div class="mb-6">
                      <app-audio-player 
                        [src]="problem.audioFilePath"
                        [title]="problem.title"
                      />
                    </div>
                  }
                }
              </div>
                
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

          <!-- Right Panel -->
          <div class="w-1/2 p-6 bg-gray-50">
            <app-code-editor 
              (onHandleSavePractise)="handleSavePractise()"
              (codeSubmitted)="handleCode($event)"
            />
            <app-audio-recorder
              (audioRecorded)="handleAudio($event)"
            />
            <small class="text-xs">*Click the green dot to record your response</small>
            @if(submissionResult(); as result) {
              <div 
                class="p-4 rounded-lg mt-4 text-sm"
                [class.bg-green-50]="result === 'Accepted'"
                [class.text-green-800]="result === 'Accepted'"
                [class.bg-red-50]="result !== 'Accepted'"
                [class.text-red-800]="result !== 'Accepted'"
              >
                Submission Result: {{ result }}
              </div>
            }
          </div>
        </div>
      } @else {
        <!-- Welcome Screen -->
        <div class="flex-1 p-6 bg-white">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            Choose Your Challenge: Tailored Tests for Every Skill
          </h2>
          <p class="text-gray-600 mb-4">
            Select a problem from the sidebar to begin your practice session.
          </p>
        </div>
      }
    </div>
  </div>


    <!-- Terms of Service Modal -->
    @if($modal()){
    <div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div class="relative w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Terms of Service
            </h3>
            <button 
              (click)="closeModal()" 
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="p-4 md:p-5 space-y-4 max-h-96 overflow-auto">
          <h5>FluentFit Terms of Service</h5>
                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Last Updated: 17 Dec, 2024<br>
                            Welcome to FluentFit, an AI-powered interview coaching platform designed to enhance interview performance for technical roles. By accessing or using our platform, you agree to these Terms of Service (the “Terms”). Please read them carefully.
                            <br>
                            1. Acceptance of Terms<br>
                            By accessing or using FluentFit (the “Service”), you agree to comply with and be bound by these Terms and our Privacy Policy. If you do not agree, you may not access or use the Service.
                            <br>
                            2. Description of Service
                            FluentFit provides AI-driven tools, including but not limited to:
                              •	Personalized interview practice
                              •	Technology stack-specific question generation
                              •	Real-time performance evaluation
                              •	Guided and free practice modes
                              •	Progress tracking and feedback
                            We reserve the right to enhance, modify, or discontinue features of the Service at any time.<br>
                            3. User Eligibility
                            To use the Service, you must:
                              1.	Be at least 18 years old or the legal age of majority in your jurisdiction.
                              2.	Have the authority to enter into these Terms.
                              3.	Provide accurate and up-to-date information during registration.
                              <br>
                            4. Account Registration and Security
                              •	You must create an account to use the Service.
                              •	You are responsible for maintaining the confidentiality of your login credentials.
                              •	You agree not to share your account credentials or allow unauthorized access.
                              •	Notify us immediately at info&#64;fluentfit.co if you suspect unauthorized use of your account.
                            </p>
                            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            5. Use of the Service
                            You agree to use the Service responsibly and lawfully. You shall not:
                              •	Use the Service for unlawful, fraudulent, or malicious purposes.
                              •	Attempt to reverse-engineer, copy, or exploit the AI technology powering the Service.
                              •	Disrupt or interfere with the platform’s operation, including introducing malware.
                              •	Use AI-generated content to impersonate others or mislead interviewers.
                            We reserve the right to terminate accounts that violate these Terms.
                            <br>
                            6. Intellectual Property
                              •	All content, tools, AI models, software, and features provided by FluentFit are the intellectual property of FluentFit or its licensors.
                              •	You may not copy, modify, or distribute any content without express permission.
                              •	User-generated content (e.g., code submissions, answers) remains your property, but you grant FluentFit a non-exclusive, worldwide license to analyze, store, and improve AI systems.
                              <br>
                            7. Payments and Subscriptions
                              •	FluentFit may offer free and paid subscription plans. Pricing and features will be clearly detailed on the platform.
                              •	Paid subscriptions auto-renew unless canceled before the renewal date.
                              •	Refunds are processed according to our Refund Policy.
                              <br>
                            8. AI-Generated Content Disclaimer
                            FluentFit uses AI to generate content and provide feedback.
                              •	AI-generated answers, feedback, or advice may not always be accurate or suitable for all scenarios.
                              •	You are solely responsible for validating AI-provided outputs.
                              •	FluentFit does not guarantee success in job interviews or employment outcomes.
                            </p>
          </div>
          <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button 
              (click)="closeModal()" 
              class="text-white bg-primary hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button 
              (click)="closeModal()" 
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Decline
            </button>
          </div>
        </div>
    </div>
    </div>
  }

    <app-prompt [isActive]="$promptActive()" [promptText]="$promptMessage()" (onClosePrompt)="handleClosePrompt()" (onHandlePromptSubmission)="handlePromptSubmission()"/>
  `,
  styles: []
})
export class PracticeComponent{
  #auth = inject(AuthService);
  $showDescription = signal(true);
  $promptActive = signal(false);
  $promptMessage = signal('');
  #practice = inject(PracticeService);
  audioBlob!: Blob;
  code!: string;
  selectedDifficulties = signal<string[]>([]);
  submissionResult = signal<string | null>(null);
  $result = signal<Result | null>(null);

  $isLoading = signal(false);
  $loadingMessage = signal('');
  protected Math = Math;
  
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

  qTypes = [
    {
      name: 'System Design',
      key: 'system design'
    },
    {
      name: 'Coding',
      key: 'coding',
    },
   
    ];
  
  // Available programming languages
  languages = ['Python', 'JavaScript', 'Java', 'C++', 'TypeScript', 'Text'];

  initialValue: ProblemEx[] = [
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
  ];
  
  // Signals for modal and video playback
  $modal = signal(false);
  $isPlaying = signal(false);
  $playbackProgress = signal(0);
  $currentTime = signal(0);
  $duration = signal(0);
  $problems = signal<ProblemEx[]>(this.initialValue);

  constructor(){
    // this.$modal.set(true);
    effect(() => {
      this.loadProblems();
    })
  }

  // Signals for reactive state management
  $selectedDifficulties = signal<string[]>([]);
  $selectedProblem = signal<ProblemEx | null>(null);
  $currentLanguage = signal('Python');
  $currentCode = signal('');
  $submissionResult = signal<'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | null>(null);

  // Toggle difficulty filters
  toggleDifficultyFilter(diff: string) {
    const currentFilters = this.$selectedDifficulties();
    if (currentFilters.includes(diff)) {
      this.$selectedDifficulties.set(currentFilters.filter((d) => d !== diff));
    } else {
      this.$selectedDifficulties.set([...currentFilters, diff]);
    }
  }

// Filtered problems based on selected difficulties
  filteredProblems(): ProblemEx[] {
    const selectedDifficulties = this.$selectedDifficulties();
      if (selectedDifficulties.length === 0) {
      return this.$problems();
      }
      return this.$problems().filter((problem) =>
        selectedDifficulties.includes(problem.questionType)
      );
  }

  // Select a problem
  selectProblem(problem: ProblemEx) {
    
    this.$selectedProblem.set(problem);

    this.$currentCode.set(''); // Clear code editor
    this.$submissionResult.set(null);
    this.$selectedDifficulties.set([]);
    const currentFilters = this.$selectedDifficulties();
    this.$selectedDifficulties.set([...currentFilters, problem.questionType]);
  }

  
  closeModal(){
    this.$modal.set(false);
  }

  handleSavePractise(){
    console.log("Testing..")
    this.$promptActive.set(true);
    this.$promptMessage.set("Are you sure you want to submit?");
  }

  handleClosePrompt(){
    this.$promptActive.set(false);
  }

  getDifficultyLabel(difficulty: number): string {
    switch (difficulty) {
      case 1: return 'Easy';
      case 2: return 'Medium';
      case 3: return 'Hard';
      default: return 'Unknown';
    }
  }

   feedback: Partial<Feedback> = {
    clarity: '',
    relevance: '',
    pronunciation: null,
    grammar: '',
    technicalAccuracy: '',
    
  };

  getFeedbackItems(feedback: Partial<Feedback>) {
    return [
      { label: 'Clarity', value: feedback.clarity },
      { label: 'Relevance', value: feedback.relevance },
      { label: 'Technical Accuracy', value: feedback.technicalAccuracy },
      { label: 'Grammar', value: feedback.grammar },
    ].filter(item => item.value);
  }

  loadProblems(){
    this.#practice.getProblemByStack().subscribe((res:BaseResponse)=>{
      this.$problems.set(res.data as ProblemEx[]);
    })
  }

  handlePromptSubmission() {
    const formData = new FormData();
    formData.append('audio', this.audioBlob, 'audio.mp3');
    this.$promptActive.set(false);
    this.$isLoading.set(true);
    this.$loadingMessage.set(this.loadingMessages[0]);
    this.rotateLoadingMessage();

    const problem_id = this.$selectedProblem()?._id || '';
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
  
  // Clean up on component destruction
  ngOnDestroy() {
    if (this.loadingMessageInterval) {
      clearInterval(this.loadingMessageInterval);
    }
  }
}