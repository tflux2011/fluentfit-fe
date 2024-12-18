// user-settings.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface UserSettings {
  name: string;
  email: string;
  profilePicture: File | null;
  language: string;
  timeZone: string;
  twoFactorEnabled: boolean;
}

@Component({
  selector: 'app-user-settings',
  imports:[ReactiveFormsModule],
  template: `
    <div class="container p-6">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">User Settings</h1>
      
      <form [formGroup]="settingsForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Profile Details Section -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <div class="flex items-center mb-4">
            <i class="bi bi-person mr-3 text-gray-600"></i>
            <h2 class="text-xl font-semibold">Profile Details</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="name" class="block mb-2">Name</label>
              <input 
                id="name"
                type="text" 
                formControlName="name"
                class="w-full p-2 border rounded"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label for="email" class="block mb-2">Email</label>
              <input 
                id="email"
                type="email" 
                formControlName="email"
                class="w-full p-2 border rounded"
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div class="mt-4">
            <label class="block mb-2">Profile Picture</label>
            <input 
              type="file"
              (change)="onFileSelected($event)"
              class="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>
        </div>

        <!-- Password Management Section -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <div class="flex items-center mb-4">

            <i class="bi bi-lock-fill mr-3 text-gray-600"></i>
            <h2 class="text-xl font-semibold">Password & Security</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="password" class="block mb-2">New Password</label>
              <input 
                id="password"
                type="password" 
                formControlName="password"
                class="w-full p-2 border rounded"
                placeholder="Enter new password"
              />
            </div>
            
            <div>
              <label for="confirmPassword" class="block mb-2">Confirm Password</label>
              <input 
                id="confirmPassword"
                type="password" 
                formControlName="confirmPassword"
                class="w-full p-2 border rounded"
                placeholder="Confirm new password"
              />
            </div>
          </div>
          
          <div class="mt-4 flex items-center space-x-2">
            <input 
              type="checkbox"
              id="twoFactor"
              formControlName="twoFactorEnabled"
              class="mr-2"
            />
            <label for="twoFactor">Enable Two-Factor Authentication</label>
          </div>
        </div>

        <!-- Language & Time Zone Section -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div class="flex items-center mb-4">
                <i class="bi bi-translate mr-3 text-gray-600"></i>
                <h2 class="text-xl font-semibold">Language</h2>
              </div>
              
              <select 
                formControlName="language"
                class="w-full p-2 border rounded"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <div>
              <div class="flex items-center mb-4">
                <i class="bi bi-clock-fill mr-3 text-gray-600"></i>
                <h2 class="text-xl font-semibold">Time Zone</h2>
              </div>
              
              <select 
                formControlName="timeZone"
                class="w-full p-2 border rounded"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Standard Time (EST)</option>
                <option value="PST">Pacific Standard Time (PST)</option>
                <option value="GMT">Greenwich Mean Time (GMT)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="text-right">
          <button 
            type="submit" 
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            [disabled]="settingsForm.invalid"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class SettingsComponent implements OnInit {
  settingsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.settingsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]],
      confirmPassword: [''],
      language: ['en'],
      timeZone: ['UTC'],
      twoFactorEnabled: [false],
      profilePicture: [null]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    return password && confirmPassword && password.value === confirmPassword.value 
      ? null 
      : { passwordMismatch: true };
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.settingsForm.patchValue({
      profilePicture: file
    });
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      const formData = this.settingsForm.value;
      console.log('Settings submitted:', formData);
      // Implement actual submission logic
    }
  }
}