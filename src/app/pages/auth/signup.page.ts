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
      
      <!-- Top Bar -->
      <div class="flex items-center justify-between pt-2">
        <button 
          (click)="goBack()" 
          class="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/5 active:scale-95 transition-all">
          <app-icon name="arrow-left" [size]="20" color="#FFFFFF"></app-icon>
        </button>
        <h2 class="text-sm font-semibold tracking-wide text-white">Create Account</h2>
        <div class="w-10"></div>
      </div>

      <!-- Form (matching 1:26 creating acc wireframe) -->
      <div class="w-full max-w-sm mx-auto my-auto py-4 space-y-6">
        
        <div class="space-y-1 text-center">
          <h1 class="text-2xl font-bold text-white tracking-tight">Join VibraTune Club</h1>
          <p class="text-xs text-[#8E8E93]">Unlock lossless audio previews and member discounts</p>
        </div>

        <form (ngSubmit)="onSubmit()" class="space-y-4">
          
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-white/80 pl-1">Full Name</label>
            <input 
              type="text" 
              [(ngModel)]="name" 
              name="name"
              placeholder="Alex Rivera"
              required
              class="w-full px-4 py-3.5 rounded-2xl bg-[#232328] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white transition-colors" />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-white/80 pl-1">Email Address</label>
            <input 
              type="email" 
              [(ngModel)]="email" 
              name="email"
              placeholder="alex.rivera@audiomart.io"
              required
              class="w-full px-4 py-3.5 rounded-2xl bg-[#232328] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white transition-colors" />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-white/80 pl-1">Password</label>
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password"
              placeholder="Create a strong password"
              required
              class="w-full px-4 py-3.5 rounded-2xl bg-[#232328] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white transition-colors" />
          </div>

          <div class="flex items-center gap-2 pt-1 pl-1">
            <input 
              type="checkbox" 
              [(ngModel)]="agreeTerms" 
              name="agreeTerms"
              id="terms"
              class="w-4 h-4 rounded bg-[#232328] border-white/20 text-white focus:ring-0 accent-white cursor-pointer" />
            <label for="terms" class="text-xs text-white/70 cursor-pointer">
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          @if (errorMessage) {
            <p class="text-xs text-red-400 pl-1">{{ errorMessage }}</p>
          }

          <div class="pt-3">
            <button 
              type="submit" 
              class="w-full py-4 rounded-full bg-white text-black font-bold text-sm tracking-wide shadow-lg hover:bg-neutral-200 active:scale-[0.98] transition-all">
              Create Account
            </button>
          </div>

        </form>

      </div>

      <!-- Bottom Login Link -->
      <div class="text-center pb-4 text-xs text-white/50">
        Already have an account? 
        <a [routerLink]="['/login']" class="text-white font-bold underline hover:text-white/80 ml-1">Sign In</a>
      </div>

    </div>
  `
})
export class SignupPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  agreeTerms = true;
  errorMessage = '';

  onSubmit() {
    if (!this.name || !this.email) {
      this.errorMessage = 'Please provide both your name and email';
      return;
    }
    this.auth.signup(this.name, this.email, this.password);
    this.router.navigate(['/home']);
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
