import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  template: `
    <div class="w-full min-h-screen p-6 bg-[#141416] text-white flex flex-col justify-between select-none animate-fade-in">
      
      <!-- Top Bar: Back to Login -->
      <div class="flex items-center justify-between pt-2">
        <button 
          (click)="goBack()" 
          class="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/5 active:scale-95 transition-all">
          <app-icon name="arrow-left" [size]="20" color="#FFFFFF"></app-icon>
        </button>
        <h2 class="text-sm font-semibold tracking-wide text-white">Create Account</h2>
        <div class="w-10"></div>
      </div>

      <!-- Form: Email, Create Password, Re-enter Password (matches video script) -->
      <div class="w-full max-w-sm mx-auto my-auto py-4 space-y-6">
        
        <div class="space-y-1 text-center">
          <h1 class="text-2xl font-black text-white tracking-tight">Join audiMart</h1>
          <p class="text-xs text-[#8E8E93]">Set up your credentials to start browsing</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="space-y-4">
          
          <!-- Field 1: Email -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-white/80 pl-2">Email Address</label>
            <input 
              type="email" 
              [(ngModel)]="email" 
              name="email"
              placeholder="alex.rivera@audiomart.io"
              required
              class="w-full px-5 py-3.5 rounded-2xl bg-[#232328] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 transition-colors" />
          </div>

          <!-- Field 2: Create Password -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-white/80 pl-2">Create Password</label>
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password"
              placeholder="Create password"
              required
              class="w-full px-5 py-3.5 rounded-2xl bg-[#232328] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 transition-colors" />
          </div>

          <!-- Field 3: Re-enter Password -->
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-white/80 pl-2">Re-enter Password</label>
            <input 
              type="password" 
              [(ngModel)]="confirmPassword" 
              name="confirmPassword"
              placeholder="Confirm password"
              required
              class="w-full px-5 py-3.5 rounded-2xl bg-[#232328] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 transition-colors" />
          </div>

          @if (errorMessage) {
            <p class="text-xs text-red-400 pl-2">{{ errorMessage }}</p>
          }

          <!-- Enter Button (matches video script: tap Enter at the bottom to create their account) -->
          <div class="pt-3">
            <button 
              type="submit" 
              class="w-full py-4 rounded-full bg-white text-black font-extrabold text-sm tracking-wide shadow-xl hover:bg-neutral-200 active:scale-[0.98] transition-all cursor-pointer">
              Enter
            </button>
          </div>

        </form>

      </div>

      <!-- Bottom Login Link -->
      <div class="text-center pb-4 text-xs text-white/50">
        Already have an account? 
        <a [routerLink]="['/login']" class="text-white font-bold underline hover:text-white/80 ml-1 cursor-pointer">Sign In</a>
      </div>

    </div>
  `
})
export class SignupPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  onSubmit() {
    if (!this.email || !this.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }
    if (!this.password) {
      this.errorMessage = 'Please create a password';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const name = this.email.split('@')[0] || 'Member';
    this.auth.signup(name, this.email, this.password);
    this.router.navigate(['/home']);
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
