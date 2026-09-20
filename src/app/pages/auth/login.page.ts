import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  template: `
    <div class="w-full min-h-screen p-6 bg-[#141416] text-white flex flex-col justify-between select-none animate-fade-in">
      
      <!-- Top Bar -->
      <div class="flex items-center justify-between pt-2">
        <button 
          (click)="goHome()" 
          class="w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-white/5 active:scale-95 transition-all">
          <app-icon name="arrow-left" [size]="20" color="#FFFFFF"></app-icon>
        </button>
        <button 
          (click)="goHome()" 
          class="text-xs text-white/60 hover:text-white font-medium px-3 py-1.5 rounded-full bg-white/5">
          Skip as Guest
        </button>
      </div>

      <!-- Hero & Logo (matching 1:5 login wireframe) -->
      <div class="flex flex-col items-center text-center my-auto py-6 space-y-6">
        <div class="w-20 h-20 rounded-full bg-[#232328] border border-white/10 flex items-center justify-center shadow-lg">
          <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <app-icon name="scanner" [size]="22" color="#141416" [strokeWidth]="2.5"></app-icon>
          </div>
        </div>

        <div class="space-y-1">
          <h2 class="text-2xl font-bold text-white tracking-tight">Welcome to VibraTune</h2>
          <p class="text-xs text-[#8E8E93]">Sign in to access personalized audio profiles & orders</p>
        </div>

        <!-- Form Inputs -->
        <form (ngSubmit)="onSubmit()" class="w-full max-w-sm space-y-4 text-left">
          
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
            <div class="flex justify-between items-center pl-1">
              <label class="text-xs font-semibold text-white/80">Password</label>
              <a href="javascript:void(0)" class="text-xs text-white/50 hover:text-white transition-colors">Forgot?</a>
            </div>
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password"
              placeholder="••••••••••••"
              required
              class="w-full px-4 py-3.5 rounded-2xl bg-[#232328] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white transition-colors" />
          </div>

          @if (errorMessage) {
            <p class="text-xs text-red-400 pl-1">{{ errorMessage }}</p>
          }

          <div class="pt-2">
            <button 
              type="submit" 
              class="w-full py-4 rounded-full bg-white text-black font-bold text-sm tracking-wide shadow-lg hover:bg-neutral-200 active:scale-[0.98] transition-all">
              Sign In
            </button>
          </div>

        </form>

      </div>

      <!-- Bottom Register Link -->
      <div class="text-center pb-4 text-xs text-white/50">
        Don't have an account? 
        <a [routerLink]="['/signup']" class="text-white font-bold underline hover:text-white/80 ml-1">Create one</a>
      </div>

    </div>
  `
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = 'alex.rivera@audiomart.io';
  password = '••••••••••••';
  errorMessage = '';

  onSubmit() {
    if (!this.email) {
      this.errorMessage = 'Please enter your email';
      return;
    }
    this.auth.login(this.email, this.password);
    this.router.navigate(['/home']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
