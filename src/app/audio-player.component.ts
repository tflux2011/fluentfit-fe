import { Component, Input, ViewChild, ElementRef, signal, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="w-full bg-white p-6">
      @if(isVisual){
        <!-- Visualization -->
        <canvas #visualizerCanvas class="w-full h-40 mb-4"></canvas>
      }
      <!-- Progress Bar -->
      <div class="mb-4">
        <input 
          type="range"
          [min]="0"
          [max]="100"
          [value]="progress()"
          (input)="onProgressChange($event)"
          class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div class="flex justify-between text-sm text-gray-500 mt-2">
          <span>{{ formatTime(currentTime()) }}</span>
          <span>{{ formatTime(duration()) }}</span>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex justify-center items-center space-x-6">
          @if(isDelete){
          <!-- Delete Button -->
          <button 
          (click)="OnDeleteAudio()"
          class="text-primary p-3 rounded-full hover:bg-green-900 hover:text-white transition-colors"
          [attr.aria-label]="'delete'"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
        </button>  
      }
      <!-- Play/Pause Button -->
        <button 
          (click)="togglePlayPause()"
          class="bg-primary text-white p-3 mx-auto rounded-full shadow-md hover:bg-green-900 transition-colors"
          [attr.aria-label]="isPlaying() ? 'Pause' : 'Play'"
        >
          @if(!isPlaying()){
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          }
          @if(isPlaying()){
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          }
        </button>

        <!-- Repeat Button -->
        <button 
          (click)="toggleRepeat()"
          class="text-gray-600 hover:text-gray-900 transition-colors"
          [ngClass]="{'text-white rounded-full p-3 bg-primary': isRepeating()}"
          aria-label="Repeat Track"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-repeat" viewBox="0 0 16 16">
            <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
          </svg>
        </button>
      </div>

      <!-- Hidden Audio Element -->
      <audio #audioPlayer [src]="src" crossorigin="anonymous" ></audio>
    </div>
  `,
  styles: []
})
export class AudioPlayerComponent implements AfterViewInit {
  @Input() src: string = '';
  @Input() isDelete: boolean = false;
  @Input() isVisual: boolean = true;
  @Output() deleteAudio = new EventEmitter<boolean>();

  // Audio state signals
  isPlaying = signal(false);
  isRepeating = signal(false);
  progress = signal(0);
  duration = signal(0);
  currentTime = signal(0);

  // Element references
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('visualizerCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private audioContext!: AudioContext;
  private analyser!: AnalyserNode;
  private canvasCtx!: CanvasRenderingContext2D;
  private animationFrameId: number = 0;

  ngAfterViewInit() {
    this.setupAudio();
    if (this.isVisual ) {
      this.setupVisualizer();
    }
  }

  private setupAudio() {
    if (this.audioPlayer?.nativeElement) {
    const audioElement = this.audioPlayer.nativeElement;

    // Load metadata and track progress
    audioElement.addEventListener('loadedmetadata', () => this.duration.set(audioElement.duration));
    audioElement.addEventListener('timeupdate', () => {
      this.progress.set((audioElement.currentTime / audioElement.duration) * 100);
      this.currentTime.set(audioElement.currentTime);
    });

    // Reset play button when audio ends
    audioElement.addEventListener('ended', () => this.isPlaying.set(false));
    }
  }

  private setupVisualizer() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
      this.analyser = this.audioContext.createAnalyser();
      this.canvasCtx = this.canvasRef.nativeElement.getContext('2d')!;

      if (this.canvasRef?.nativeElement) {
        const source = this.audioContext.createMediaElementSource(this.audioPlayer.nativeElement);
        source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        this.analyser.fftSize = 256; 
        this.drawVisualizer();
      }
    }
  }

  private drawVisualizer() {
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      this.animationFrameId = requestAnimationFrame(draw);

      this.analyser.getByteFrequencyData(dataArray);
      if (this.canvasRef?.nativeElement) {
          const canvas = this.canvasRef.nativeElement;
          this.canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

          // Visualize as bars
          const barWidth = (canvas.width / bufferLength) * 2.5;
          let barHeight: number;
          let x = 0;

          dataArray.forEach((value) => {
            barHeight = value / 2;
            this.canvasCtx.fillStyle = `rgb(${barHeight + 49},51,58)`;
            this.canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
          });
      }
    };

    draw();
  }

  togglePlayPause() {
    const audioElement = this.audioPlayer.nativeElement;

    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }

    if (this.isPlaying()) {
      audioElement.pause();
      cancelAnimationFrame(this.animationFrameId);
    } else {
      audioElement.play();
      this.audioContext.resume();
      this.drawVisualizer();
    }

    this.isPlaying.update((current) => !current);
  }

  toggleRepeat() {
    this.isRepeating.update((current) => !current);
    this.audioPlayer.nativeElement.loop = this.isRepeating();
  }

  onProgressChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const audioElement = this.audioPlayer.nativeElement;

    audioElement.currentTime = (Number(inputElement.value) / 100) * this.duration();
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  OnDeleteAudio(){
    this.deleteAudio.emit(false);
  }
}


