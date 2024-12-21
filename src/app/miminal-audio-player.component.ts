import { Component, Input, ViewChild, ElementRef, signal, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-minimal-audio-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="inline-flex items-center space-x-3">
      <!-- Play/Delete Controls -->
      <div class="flex items-center">
        <!-- Play/Pause Button -->
        <button 
          (click)="togglePlayPause()"
          class="p-2 rounded-full transition-colors"
          [class.bg-blue-500]="isPlaying()"
          [class.text-white]="isPlaying()"
          [class.text-gray-600]="!isPlaying()"
          [class.hover:bg-blue-600]="isPlaying()"
          [class.hover:bg-gray-100]="!isPlaying()"
          [attr.aria-label]="isPlaying() ? 'Pause' : 'Play'"
        >
          @if(!isPlaying()){
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          } @else {
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          }
        </button>

        @if(isDelete && !isPlaying()){
          <button 
            (click)="OnDeleteAudio()"
            class="p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        }
      </div>

      <!-- Time and Progress -->
      <div class="text-xs text-gray-500 min-w-[40px]">
        {{ formatTime(currentTime()) }}
      </div>

      @if(isVisual){
        <!-- Mini Visualizer -->
        <canvas #visualizerCanvas 
          class="w-24 h-8 rounded"
        ></canvas>
      }

      <!-- Hidden Audio Element -->
      <audio #audioPlayer [src]="src" crossorigin="anonymous"></audio>
    </div>
  `
})
export class MinimalAudioPlayerComponent implements AfterViewInit {
  @Input() src: string = '';
  @Input() isDelete: boolean = false;
  @Input() isVisual: boolean = true;
  @Output() deleteAudio = new EventEmitter<boolean>();

  // Audio state signals
  isPlaying = signal(false);
  currentTime = signal(0);
  duration = signal(0);

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('visualizerCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private audioContext!: AudioContext;
  private analyser!: AnalyserNode;
  private canvasCtx!: CanvasRenderingContext2D;
  private animationFrameId: number = 0;

  ngAfterViewInit() {
    this.setupAudio();
    if (this.isVisual) {
      this.setupVisualizer();
    }
  }

  private setupAudio() {
    const audioElement = this.audioPlayer.nativeElement;

    audioElement.addEventListener('loadedmetadata', () => {
      this.duration.set(audioElement.duration);
    });

    audioElement.addEventListener('timeupdate', () => {
      this.currentTime.set(audioElement.currentTime);
    });

    audioElement.addEventListener('ended', () => {
      this.isPlaying.set(false);
      audioElement.currentTime = 0;
    });
  }

  private setupVisualizer() {
    if (!this.canvasRef) return;

    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.canvasCtx = this.canvasRef.nativeElement.getContext('2d')!;

    const source = this.audioContext.createMediaElementSource(this.audioPlayer.nativeElement);
    source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.analyser.fftSize = 32; // Smaller FFT for minimal visualization
    this.drawVisualizer();
  }

  private drawVisualizer() {
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!this.isPlaying()) {
        cancelAnimationFrame(this.animationFrameId);
        return;
      }

      this.animationFrameId = requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(dataArray);
      
      const canvas = this.canvasRef.nativeElement;
      const ctx = this.canvasCtx;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      dataArray.forEach((value) => {
        const barHeight = (value / 255) * canvas.height * 0.8;
        ctx.fillStyle = `rgba(59, 130, 246, ${value / 255})`; // Blue with opacity
        ctx.fillRect(
          x,
          canvas.height - barHeight,
          barWidth - 1,
          barHeight
        );
        x += barWidth;
      });
    };

    draw();
  }

  togglePlayPause() {
    const audioElement = this.audioPlayer.nativeElement;

    if (this.isPlaying()) {
      audioElement.pause();
    } else {
      audioElement.play();
      if (this.isVisual) {
        this.audioContext.resume();
        this.drawVisualizer();
      }
    }

    this.isPlaying.update(current => !current);
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  OnDeleteAudio() {
    this.deleteAudio.emit(false);
  }
}