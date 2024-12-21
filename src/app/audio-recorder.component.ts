import { Component, OnInit, OnDestroy, signal, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from "./audio-player.component";
import { MinimalAudioPlayerComponent } from './miminal-audio-player.component';

@Component({
  selector: 'app-audio-recorder',
  standalone: true,
  imports: [CommonModule, MinimalAudioPlayerComponent],
  template: `
    <div class="inline-flex items-center space-x-3">
      @if(!audioURL()) {
        <!-- Record Button and Visualizer -->
        <div class="inline-flex items-center space-x-3">
          <!-- Record Button -->
          <button 
            (click)="isRecording() ? stopRecording() : startRecording()"
            class="p-2 rounded-full transition-all duration-200 border"
            [class.bg-green-500]="isRecording()"
            [class.bg-transparent]="!isRecording()"
            [class.text-green-500]="!isRecording()"
            [class.text-white]="isRecording()"
            [class.hover:bg-green-600]="isRecording()"
            [class.hover:bg-green-50]="!isRecording()"
          >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="6"/>
            </svg>
          </button>

          <!-- Timer -->
          @if(isRecording()) {
            <div class="text-xs text-gray-500 min-w-[40px]">
              {{ formatTime(recordingDuration()) }}
            </div>
          }

          <!-- Mini Visualizer -->
          @if(isRecording()) {
            <div class="flex items-center space-x-0.5 h-8">
              @for(bar of visualizerBars(); track bar) {
                <div 
                  class="w-0.5 bg-red-500 rounded-full transition-all duration-75"
                  [style.height.px]="bar"
                ></div>
              }
            </div>
          }
        </div>
      } @else {
        <!-- Audio Player -->
        <app-minimal-audio-player 
          [src]="audioURL() || ''"
          [isDelete]="true"
          [isVisual]="true"
          (deleteAudio)="handleDeleteAudio()"
        />
      }
    </div>
  `
})
export class AudioRecorderComponent implements OnInit, OnDestroy {
  @Output() audioRecorded = new EventEmitter<Blob>();
  
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;

  isRecording = signal(false);
  audioURL = signal<string | null>(null);
  recordingDuration = signal(0);
  visualizerBars = signal<number[]>([]);

  ngOnInit() {}

  async startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      // Setup audio visualization
      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 32; // Reduced for simpler visualization
      source.connect(this.analyser);

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/mp3' });
        this.audioURL.set(URL.createObjectURL(audioBlob));
        this.audioRecorded.emit(audioBlob);
      };

      this.mediaRecorder.start();
      this.isRecording.set(true);
      this.startDurationTracking();
      this.startVisualization();
    } catch (error) {
      console.error('Recording error:', error);
      alert('Microphone access denied. Please check permissions.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.isRecording.set(false);
      
      if (this.audioContext) {
        this.audioContext.close();
        this.audioContext = null;
      }
    }
  }

  private startDurationTracking() {
    const startTime = Date.now();
    const updateDuration = () => {
      if (this.isRecording()) {
        this.recordingDuration.set(Math.floor((Date.now() - startTime) / 1000));
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
      
      // Generate 8 bars for visualization
      const bars = Array.from({ length: 8 }, (_, i) => {
        const index = Math.floor(i * (bufferLength / 8));
        return Math.max(3, (dataArray[index] / 255) * 24); // Reduced max height
      });

      this.visualizerBars.set(bars);
      requestAnimationFrame(updateVisualizer);
    };

    updateVisualizer();
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  handleDeleteAudio() {
    if (this.audioURL()) {
      URL.revokeObjectURL(this.audioURL()!);
    }
    this.audioURL.set(null);
  }

  ngOnDestroy() {
    this.stopRecording();
    if (this.audioURL()) {
      URL.revokeObjectURL(this.audioURL()!);
    }
  }
}