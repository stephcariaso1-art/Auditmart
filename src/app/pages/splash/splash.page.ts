import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-splash-page',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="w-full h-full min-h-screen flex flex-col items-center justify-between p-8 bg-[#141416] select-none text-white animate-fade-in">
      
      <!-- Top Spacing -->
      <div class="w-full flex justify-end pt-4">
        <button 
          (click)="skip()" 
          class="text-xs text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10">
          Skip
        </button>
      </div>

      <!-- Center Logo & Emblem matching Figma 106:2 loading page -->
      <div class="flex flex-col items-center justify-center text-center space-y-6">
        <!-- Glowing Circular Logo -->
        <div class="relative w-32 h-32 rounded-full bg-[#232328] flex items-center justify-center border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.06)]">
          <div class="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-inner">
            <app-icon name="scanner" [size]="36" color="#141416" [strokeWidth]="2.5"></app-icon>
          </div>
          <!-- Pulse ring -->
          <div class="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-25"></div>
        </div>

        <div class="space-y-2">
          <h1 class="text-3xl font-extrabold tracking-tight text-white flex items-center justify-center gap-1.5 font-sans">
            <span>Vibra</span><span class="text-white/60 font-medium">Tune</span>
          </h1>
          <p class="text-xs text-[#8E8E93] tracking-wider uppercase font-semibold">
            AudiMart Premium Acoustics
          </p>
        </div>

        <!-- Wireframe Loading Pill (matches Figma loading page) -->
        <div class="w-48 h-2 bg-[#25252A] rounded-full overflow-hidden mt-4">
          <div class="h-full bg-white rounded-full animate-[pulse_1.5s_ease-in-out_infinite] w-3/4"></div>
        </div>
      </div>

      <!-- Bottom Enter / Explore CTA -->
      <div class="w-full max-w-xs space-y-3 pb-6">
        <button 
          (click)="enterApp()" 
          class="w-full py-4 rounded-full bg-white text-black font-bold text-sm tracking-wide shadow-lg hover:bg-neutral-200 active:scale-[0.98] transition-all">
          Explore Collection
        </button>
        <button 
          (click)="goToLogin()" 
          class="w-full py-3 rounded-full bg-[#232328] text-white/80 hover:text-white font-medium text-xs tracking-wide border border-white/10 transition-colors">
          Sign In to Account
        </button>
      </div>

    </div>
  `
})
export class SplashPage implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    // Automatically advance after brief intro if user doesn't click
    setTimeout(() => {
      // If still on splash page, navigate to home
      if (this.router.url === '/' || this.router.url === '/splash') {
        this.router.navigate(['/home']);
      }
    }, 2800);
  }

  enterApp() {
    this.router.navigate(['/home']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  skip() {
    this.router.navigate(['/home']);
  }
}
