import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-splash-page',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="w-full h-full min-h-screen flex flex-col items-center justify-between p-8 bg-[#141416] select-none text-white animate-fade-in">
      
      <!-- Top Bar / Skip option -->
      <div class="w-full flex justify-end pt-4">
        <button 
          (click)="continue()" 
          class="text-xs text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10">
          Skip
        </button>
      </div>

      <!-- Center Logo & Welcome emblem (matches script: Welcome Screen of AudiMart with logo in center) -->
      <div class="flex flex-col items-center justify-center text-center space-y-6 my-auto">
        
        <!-- App Logo Emblem -->
        <div class="relative w-32 h-32 rounded-full bg-[#232328] flex items-center justify-center border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.08)]">
          <div class="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">
            <app-icon name="scanner" [size]="36" color="#141416" [strokeWidth]="2.5"></app-icon>
          </div>
          <!-- Subtle pulse ring -->
          <div class="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-20"></div>
        </div>

        <!-- App Name: audiMart -->
        <div class="space-y-2">
          <h1 class="text-3xl font-black tracking-tight text-white flex items-center justify-center gap-1 font-sans">
            <span>audi</span><span class="text-white/60 font-semibold">Mart</span>
          </h1>
          <p class="text-xs text-[#8E8E93] tracking-wider uppercase font-semibold">
            Premium Audio Gear & Acoustics
          </p>
        </div>

        <!-- Sleek Loading Line Indicator -->
        <div class="w-44 h-1.5 bg-[#25252A] rounded-full overflow-hidden mt-4">
          <div class="h-full bg-white rounded-full animate-[pulse_1.5s_ease-in-out_infinite] w-2/3"></div>
        </div>

      </div>

      <!-- Bottom Action: Continue Button (matches script: a Continue button below it) -->
      <div class="w-full max-w-xs pb-6">
        <button 
          (click)="continue()" 
          class="w-full py-4 rounded-full bg-white text-black font-extrabold text-sm tracking-wide shadow-xl hover:bg-neutral-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
          <span>Continue</span>
          <app-icon name="arrow-right" [size]="16" color="#000000" [strokeWidth]="2.5"></app-icon>
        </button>
      </div>

    </div>
  `
})
export class SplashPage {
  private router = inject(Router);

  continue() {
    this.router.navigate(['/login']);
  }
}
