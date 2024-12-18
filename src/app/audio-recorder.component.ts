import { Component, OnInit, OnDestroy, signal, computed, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tooltip } from 'flowbite';
import { AudioPlayerComponent } from "./audio-player.component";

@Component({
  selector: 'app-audio-recorder',
  standalone: true,
  imports: [CommonModule, AudioPlayerComponent],
  template: `
    <!-- <div class=" mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4"> -->
    <div class="w-full bg-white border border-gray-300 rounded-lg p-6 space-y-4 font-mono text-sm focus:ring-primary-500 focus:border-primary-500">
    @if(!audioURL()){  
    <!-- Recording Status -->
      <div class="text-center">
        <p class="text-gray-600">
          {{ recordingStatus() }}
        </p>
      </div>

      <!-- Audio Visualizer -->
      <div class="w-full h-2 bg-gray-100 rounded-lg flex items-center justify-center">
        @if (isRecording()) {
          <div class="flex space-x-1">
            @for (bar of visualizerBars(); track bar) {
              <div 
                class="w-2 bg-blue-500 transition-all duration-100 ease-in-out" 
                [style.height.px]="bar"
              ></div>
            }
          </div>
        } @else {
          <!-- <p class="text-gray-400">No audio recording</p> -->
        }
      </div>


      <!-- Recording Controls -->
      <div class="flex justify-center space-x-4">
        <!-- Start Recording -->
        <button 
          (click)="startRecording()"
          [disabled]="isRecording()"
          class="p-3 bg-primary text-white rounded-full 
                 hover:bg-green-600 disabled:opacity-50 
                 transition-colors flex items-center"
          data-tooltip-target="start-tooltip"
        >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-6 w-6 bi bi-mic" viewBox="0 0 16 16">
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
            <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/>
          </svg>
        </button>

        <!-- Stop Recording -->
        <button 
          (click)="stopRecording()"
          [disabled]="!isRecording()"
          class="p-3 bg-red-500 text-white rounded-full 
                 hover:bg-red-600 disabled:opacity-50 
                 transition-colors flex items-center"
          data-tooltip-target="stop-tooltip"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 14c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1h8c.55 0 1 .45 1 1v8z"/>
          </svg>
        </button>
      </div>
    }

      <!-- Recorded Audio Playback -->
      <!-- @if (audioURL()) {
        <div class="mt-4 flex items-center space-x-4">
          <audio 
            [src]="audioURL()" 
            controls 
            class="w-full"
          ></audio>
          <button 
            (click)="downloadRecording()"
            class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Download
          </button>
        </div>
      } -->
        @if(audioURL()){
          <div class="mt-4  items-center space-x-4">
          <app-audio-player 
            [src]="audioURL() || ''" 
            [title]="'My Favorite Song'" 
            [isDelete]="true"
            [isVisual]="false"
            (deleteAudio)="handleDeleteAudio()"
          >
          </app-audio-player>
          </div>
        }

      <!-- Tooltips -->
      <div id="start-tooltip" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        Start Recording
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
      <div id="stop-tooltip" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        Stop Recording
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  `,
  styles: []
})
export class AudioRecorderComponent implements OnInit, OnDestroy {
  @Output() audioRecorded = new EventEmitter<Blob>();
  private audioBlob!: Blob;

  // Recording state signals
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;

  // Component signals
  isRecording = signal(false);
  audioURL = signal<string | null>(null);
  recordingDuration = signal(0);
  visualizerBars = signal<number[]>([]);

  // Computed signals
  recordingStatus = computed(() => {
    if (this.isRecording()) {
      return `Recording: ${this.formatTime(this.recordingDuration())}`;
    }
    return this.audioURL() 
      ? 'Recording Complete' 
      : 'Ready to Record';
  });

  ngOnInit() {
    if (typeof window !== 'undefined') {
      // Explicitly cast NodeList elements to HTMLElement
      const tooltipElements = document.querySelectorAll('[data-tooltip-target]') as NodeListOf<HTMLElement>;
  
      tooltipElements.forEach((el) => {
        const targetId = el.getAttribute('data-tooltip-target');
        const tooltipElement = document.getElementById(targetId || '') as HTMLElement;
  
        if (tooltipElement) {
          new Tooltip(tooltipElement, el); // Both are guaranteed to be HTMLElement
        }
      });
    }
  }

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      // Audio visualization setup
      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      source.connect(this.analyser);

      // Start recording and visualization
      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = this.createAudioBlob.bind(this);
      this.mediaRecorder.start();
      this.isRecording.set(true);

      // Start duration tracking
      this.startDurationTracking();
      
      // Start visualization
      this.startVisualization();
    } catch (error) {
      console.error('Recording error:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.isRecording.set(false);
      
      // Stop audio context and analysis
      if (this.audioContext) {
        this.audioContext.close();
        this.audioContext = null;
        this.audioRecorded.emit(this.audioBlob); 
      }
    }
  }

  private createAudioBlob() {
    const audioBlob = new Blob(this.audioChunks, { type: 'audio/mp3' });
    this.audioURL.set(URL.createObjectURL(audioBlob));
  }

  downloadRecording() {
    if (this.audioURL()) {
      const link = document.createElement('a');
      link.href = this.audioURL() || '';
      link.download = `recording_${new Date().toISOString()}.mp3`;
      link.click();
    }
  }

  private startDurationTracking() {
    const startTime = Date.now();
    const updateDuration = () => {
      if (this.isRecording()) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        this.recordingDuration.set(elapsed);
        requestAnimationFrame(updateDuration);
      }
    };
    updateDuration();
  }

  private startVisualization() {
    if (!this.analyser) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateVisualizer = () => {
      if (!this.isRecording() || !this.analyser) return;

      this.analyser.getByteFrequencyData(dataArray);
      
      // Generate simplified bar heights
      const bars = Array.from({ length: 10 }, (_, i) => {
        const index = Math.floor(i * (bufferLength / 10));
        return Math.max(5, (dataArray[index] / 255) * 50);
      });

      this.visualizerBars.set(bars);
      requestAnimationFrame(updateVisualizer);
    };

    updateVisualizer();
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  ngOnDestroy() {
    // Clean up resources
    if (this.mediaRecorder) {
      this.stopRecording();
    }
    if (this.audioURL()) {
      URL.revokeObjectURL(this.audioURL() || '');
    }
  }

  handleDeleteAudio(){
    this.audioURL.set('');
  }
}