import { Component, signal, ViewChild, ElementRef, AfterViewInit, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioPlayerComponent } from '../audio-player.component';
import { AudioRecorderComponent } from "../audio-recorder.component";
import { PracticeService } from '../services/practice.service';
import { BaseResponse, ProblemEx } from '../../interfaces/interface';
import { CodeEditorComponent } from "../app-code-editor";
import { PromptComponent } from '../utils/prompt.component';

interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  tags: string[];
  videoUrl?: string;
}

interface CodeSubmission {
  language: string;
  code: string;
  result?: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded';
}

@Component({
  selector: 'app-practice',
  standalone: true,
  imports: [CommonModule, FormsModule, AudioPlayerComponent, AudioRecorderComponent, CodeEditorComponent, PromptComponent],
  template: `
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <div class="w-64 border-r border-gray-200 p-4 overflow-y-auto">
      <h2 class="text-xl font-bold text-gray-800 mb-6">Problem Set</h2>
      
      <!-- Problem Filters -->
      <div class="mb-4">
        <div class="flex space-x-2 bg-primary p-2">
          @for(diff of qTypes; track diff) {
            <button 
              (click)="toggleDifficultyFilter(diff.key)"
              class="px-3 py-1 rounded-full text-xs font-medium transition-colors {{ 
                !$selectedDifficulties().includes(diff.key) 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }}"
            >
              {{ diff.name }}
            </button>
          }
        </div>
      </div>

      <!-- Problem List -->
      <div class="space-y-2">
        @for(problem of filteredProblems(); track problem._id; let idx = $index;) {
          <div 
            (click)="selectProblem(problem)"
            class="cursor-pointer p-3 rounded-lg transition-colors {{ 
              $selectedProblem()?._id === problem._id 
                ? 'bg-primary-50 border border-primary-200' 
                : 'hover:bg-gray-100'
            }}"
          >
            <div class="flex justify-between items-center">
              <span class="font-medium text-gray-800">{{ problem.title}}</span>
              <span class="{{ 
                problem.stack === 'MEAN' ? 'text-green-500' : 
                problem.stack === 'MERN' ? 'text-yellow-500' : 
                'text-red-500'
              }} text-xs font-semibold">
                {{ problem.stack }}
              </span>
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
      <!-- Problem Description -->
      @if($selectedProblem(); as problem) {
        <div class="p-6 bg-white border-b border-gray-200">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ problem.title }}</h1>
          <div class="flex items-center space-x-3">
           <span class="text-sm"> Difficulty:</span> <span class="{{ 
              problem.difficulty === 1 ? 'bg-green-100 text-green-800' : 
              problem.difficulty === 2 ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }} px-2.5 py-0.5 rounded-full text-xs font-medium">
              {{ problem.difficulty }}
            </span>
            <span class="text-gray-500 text-sm">Stack: {{ problem.stack }}</span>
          </div>
        </div>
      }

      @if($selectedProblem(); as problem) {
      <!-- Code Editor and Playback -->
      <div class="flex-1 flex">
        <!-- Problem Description Pane -->
        <div class="w-1/2 p-6 bg-white border-r border-gray-200 overflow-y-auto">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Problem Description</h2>
          <p class="text-gray-600 mb-4">
            Listen to the audio below to answer the question and record your explanation after solving the question.
          </p>
          <!-- Video Playback Section -->
          @if($selectedProblem()?.audioFilePath) {
            <div class="mb-4">
          
              <app-audio-player 
                [src]="$selectedProblem()?.audioFilePath || ''" 
                [title]="$selectedProblem()?.title" 
                >
              </app-audio-player>
          
            </div>
        }
        </div>
      
        <!-- Code Editor Pane -->
        <div class="w-1/2 p-6 bg-gray-50">
          <app-code-editor (onHandleSavePractise)="handleSavePractise()" (codeSubmitted)="handleCode($event)"/>

          <!-- Submission Result -->
          @if($submissionResult(); as result) {
            <div class="{{ 
              result === 'Accepted' ? 'bg-green-50 text-green-800' : 
              'bg-red-50 text-red-800'
            }} p-4 rounded-lg mt-4 text-sm">
              Submission Result: {{ result }}
            </div>
          }
          <app-audio-recorder (audioRecorded)="handleAudio($event)"/>
        </div>
      </div>
      }@else {
        <div class="flex-1 flex">
          <!-- Problem Description Pane -->
          <div class="w-1/2 p-6 bg-white border-r border-gray-200 overflow-y-auto">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Choose Your Challenge: Tailored Tests for Every Skill</h2>
            <p class="text-gray-600 mb-4">
            Discover how FluentFit can help you shine in technical interviews. Select the test type that aligns with your goals, and we’ll provide you with a personalized set of questions to prepare you for success.
            </p>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Coding Assessment</h3>
            <p class="text-gray-600 mb-4"><strong>“Crack the code, one challenge at a time!”</strong>
              Test your ability to solve technical problems with real-world coding challenges tailored to your selected stack. From algorithms like “Two Sum” to crafting utility functions, this test hones your problem-solving skills while simulating actual interview scenarios.
            </p>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">System Design Test</h3>
            <p class="text-gray-600 mb-4"><strong>“Blueprint your way to brilliance!”</strong>
            Showcase your expertise in designing scalable, efficient systems. You’ll tackle scenarios like architecting a payment gateway or designing a recommendation engine—perfect for honing your high-level thinking and communication with technical teams.
            </p>
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Soft Skills Evaluation</h3>
            <p class="text-gray-600 mb-4"><strong>“Speak your success into existence!”</strong>
            Demonstrate your ability to communicate effectively, navigate workplace challenges, and collaborate like a pro. This test focuses on non-technical interview essentials, such as how to approach tricky behavioral questions and convey your strengths confidently.
            </p>
            <h3 class="text-lg font-semibold text-gray-800 my-4">What’s Next?</h3>
            <p class="text-gray-600 mb-4">Pick a test and dive in! Remember, this isn’t timed—focus on delivering your best responses. You’ll receive detailed feedback to help you refine your skills for your next interview.
            </p>
          </div>
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
  $promptActive = signal(false);
  $promptMessage = signal('');
  #practice = inject(PracticeService);
  audioBlob!: Blob;
  code!: string;


  handleAudio(audio: Blob) {
    this.audioBlob = audio; // Store audio blob
  }

  handleCode(code: string) {
    this.code = code; // Store code content
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


  loadProblems(){
    this.#practice.getProblemByStack().subscribe((res:BaseResponse)=>{
      this.$problems.set(res.data as ProblemEx[]);
    })
  }

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
    console.log(this.audioBlob);
  }

  handleClosePrompt(){
    this.$promptActive.set(false);
  }

  handlePromptSubmission(){
    const formData = new FormData();
    formData.append('audio', this.audioBlob, 'audio.mp3');
    formData.append('code', this.code);
    const payload = {

    }
    this.#practice.submitProblem(payload).subscribe((res) => {
      if (res) {
        console.log('Practice submitted successfully!');
      } else {
        console.error('Error submitting practice:', res);
      }
    });
    

   
  }
}