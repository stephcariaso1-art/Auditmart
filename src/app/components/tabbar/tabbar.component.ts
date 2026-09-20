import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-tabbar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <nav class="fixed bottom-4 left-0 right-0 max-w-[420px] mx-auto px-5 z-40 select-none pointer-events-none">
      <div class="glass-dock rounded-[32px] px-3 py-2 flex items-center justify-between shadow-dock pointer-events-auto border border-white/10 bg-[#1A1A1E]/95 backdrop-blur-xl">
        
        <!-- Tab 1: Home -->
        <button 
          (click)="navigateTo('/home')" 
          class="flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all group"
          [ngClass]="isActive('/home') ? 'text-white' : 'text-white/40 hover:text-white/70'">
          <app-icon name="home" [size]="20" [color]="isActive('/home') ? '#FFFFFF' : '#8E8E93'"></app-icon>
          <span class="text-[10px] font-medium mt-0.5" [ngClass]="isActive('/home') ? 'text-white' : 'text-white/40'">Home</span>
        </button>

        <!-- Tab 2: Cart -->
        <button 
          (click)="navigateTo('/cart')" 
          class="relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all group"
          [ngClass]="isActive('/cart') ? 'text-white' : 'text-white/40 hover:text-white/70'">
          <div class="relative">
            <app-icon name="cart" [size]="20" [color]="isActive('/cart') ? '#FFFFFF' : '#8E8E93'"></app-icon>
            @if (cart.totalCount() > 0) {
              <span class="absolute -top-1.5 -right-2 px-1.5 min-w-[16px] h-4 bg-white text-black text-[10px] font-extrabold rounded-full flex items-center justify-center shadow-sm">
                {{ cart.totalCount() }}
              </span>
            }
          </div>
          <span class="text-[10px] font-medium mt-0.5" [ngClass]="isActive('/cart') ? 'text-white' : 'text-white/40'">Cart</span>
        </button>

        <!-- Center: Elevated Diamond Scanner Button -->
        <div class="relative -top-3 flex items-center justify-center">
          <button 
            (click)="onScan()" 
            class="w-12 h-12 rounded-2xl bg-white rotate-45 flex items-center justify-center shadow-lg shadow-white/10 hover:scale-105 active:scale-95 transition-transform">
            <div class="-rotate-45 flex items-center justify-center">
              <app-icon name="scanner" [size]="20" color="#121214" [strokeWidth]="2.4"></app-icon>
            </div>
          </button>
        </div>

        <!-- Tab 4: Orders / Categories -->
        <button 
          (click)="navigateTo('/orders')" 
          class="flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all group"
          [ngClass]="isActive('/orders') ? 'text-white' : 'text-white/40 hover:text-white/70'">
          <app-icon name="categories" [size]="20" [color]="isActive('/orders') ? '#FFFFFF' : '#8E8E93'"></app-icon>
          <span class="text-[10px] font-medium mt-0.5" [ngClass]="isActive('/orders') ? 'text-white' : 'text-white/40'">Orders</span>
        </button>

        <!-- Tab 5: Profile -->
        <button 
          (click)="navigateTo('/profile')" 
          class="flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all group"
          [ngClass]="isActive('/profile') ? 'text-white' : 'text-white/40 hover:text-white/70'">
          <app-icon name="profile" [size]="20" [color]="isActive('/profile') ? '#FFFFFF' : '#8E8E93'"></app-icon>
          <span class="text-[10px] font-medium mt-0.5" [ngClass]="isActive('/profile') ? 'text-white' : 'text-white/40'">Profile</span>
        </button>

      </div>
    </nav>
  `
})
export class TabbarComponent {
  private router = inject(Router);
  cart = inject(CartService);

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  onScan() {
    this.cart.showToast('Audio Augmented Scanner activated');
  }
}
