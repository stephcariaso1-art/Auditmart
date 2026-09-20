import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, IconComponent],
  template: `
    <div class="w-full min-h-screen bg-[#141416] text-white flex flex-col pb-32 select-none animate-fade-in">
      
      <!-- Top Navbar (matches Figma 71:6 Profile wireframe) -->
      <app-navbar 
        [title]="'Profile'" 
        [showBack]="true"
        backUrl="/home">
      </app-navbar>

      <div class="px-5 space-y-6 pt-2 flex-1">
        
        <!-- User Avatar & Header (matches top circle in 71:6 wireframe) -->
        <div class="flex flex-col items-center text-center space-y-3 pt-2">
          
          <div class="relative w-24 h-24 rounded-full p-1 border-2 border-white/20">
            <img 
              [src]="user()?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'" 
              alt="Profile" 
              class="w-full h-full object-cover rounded-full shadow-lg" />
            <div class="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shadow-md">
              <app-icon name="check" [size]="14" color="#000000" [strokeWidth]="3"></app-icon>
            </div>
          </div>

          <div class="space-y-1">
            <h2 class="text-lg font-black tracking-tight text-white">{{ user()?.name || 'Alex Rivera' }}</h2>
            <p class="text-xs text-[#8E8E93]">{{ user()?.email || 'alex.rivera@audiomart.io' }}</p>
            <span class="inline-block mt-1 px-3 py-1 rounded-full bg-white/10 text-[10px] font-extrabold uppercase tracking-wider text-white border border-white/10">
              {{ user()?.memberTier || 'Audiophile VIP Club' }}
            </span>
          </div>

        </div>

        <!-- Settings Options Pills (matches vertical pill containers in 71:6 wireframe) -->
        <div class="space-y-2.5 pt-2">
          
          <button 
            (click)="onOptionClick('Personal Information')"
            class="w-full p-4 rounded-2xl bg-[#232328] hover:bg-[#2C2C32] border border-white/[0.06] flex items-center justify-between transition-colors shadow-card">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/80">
                <app-icon name="profile" [size]="16" color="#FFFFFF"></app-icon>
              </div>
              <span class="text-xs font-bold text-white">Personal Information</span>
            </div>
            <app-icon name="arrow-right" [size]="14" color="#8E8E93"></app-icon>
          </button>

          <button 
            (click)="onOptionClick('Shipping Addresses')"
            class="w-full p-4 rounded-2xl bg-[#232328] hover:bg-[#2C2C32] border border-white/[0.06] flex items-center justify-between transition-colors shadow-card">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/80">
                <app-icon name="map-pin" [size]="16" color="#FFFFFF"></app-icon>
              </div>
              <span class="text-xs font-bold text-white">Shipping Addresses</span>
            </div>
            <app-icon name="arrow-right" [size]="14" color="#8E8E93"></app-icon>
          </button>

          <button 
            (click)="onOptionClick('Payment Methods')"
            class="w-full p-4 rounded-2xl bg-[#232328] hover:bg-[#2C2C32] border border-white/[0.06] flex items-center justify-between transition-colors shadow-card">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/80">
                <app-icon name="credit-card" [size]="16" color="#FFFFFF"></app-icon>
              </div>
              <span class="text-xs font-bold text-white">Payment Cards & Wallets</span>
            </div>
            <app-icon name="arrow-right" [size]="14" color="#8E8E93"></app-icon>
          </button>

          <button 
            (click)="goToOrders()"
            class="w-full p-4 rounded-2xl bg-[#232328] hover:bg-[#2C2C32] border border-white/[0.06] flex items-center justify-between transition-colors shadow-card">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/80">
                <app-icon name="truck" [size]="16" color="#FFFFFF"></app-icon>
              </div>
              <span class="text-xs font-bold text-white">Order History & Tracking</span>
            </div>
            <app-icon name="arrow-right" [size]="14" color="#8E8E93"></app-icon>
          </button>

          <button 
            (click)="onOptionClick('Audio Equalizer Settings')"
            class="w-full p-4 rounded-2xl bg-[#232328] hover:bg-[#2C2C32] border border-white/[0.06] flex items-center justify-between transition-colors shadow-card">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/80">
                <app-icon name="sliders" [size]="16" color="#FFFFFF"></app-icon>
              </div>
              <span class="text-xs font-bold text-white">Equalizer & Audio Preferences</span>
            </div>
            <app-icon name="arrow-right" [size]="14" color="#8E8E93"></app-icon>
          </button>

        </div>

        <!-- Logout Button (matches bottom pill in 71:6 wireframe) -->
        <div class="pt-4">
          <button 
            (click)="logout()"
            class="w-full py-4 rounded-full bg-[#232328] hover:bg-red-500/20 text-red-400 font-bold text-xs tracking-wider uppercase border border-red-500/30 transition-all flex items-center justify-center gap-2">
            <app-icon name="log-out" [size]="16" color="#F87171"></app-icon>
            <span>Sign Out</span>
          </button>
        </div>

      </div>

    </div>
  `
})
export class ProfilePage {
  auth = inject(AuthService);
  private cart = inject(CartService);
  private router = inject(Router);

  user = this.auth.currentUser;

  onOptionClick(option: string) {
    this.cart.showToast(`${option} settings updated`);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
