import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, IconComponent],
  template: `
    <div class="w-full min-h-screen bg-[#141416] text-white flex flex-col pb-36 select-none animate-fade-in relative">
      
      <!-- Top Navbar (matches Figma 58:2 cart wireframe) -->
      <app-navbar 
        [title]="'Shopping Cart'" 
        [showBack]="true"
        backUrl="/home">
      </app-navbar>

      <div class="px-5 space-y-4 pt-1 flex-1">
        
        <!-- Cart Items List -->
        @if (cart.items().length > 0) {
          <div class="space-y-3">
            @for (item of cart.items(); track item.product.id + item.selectedColor.name) {
              <div class="w-full bg-[#222226] rounded-[24px] p-4 flex items-center gap-4 border border-white/[0.05] shadow-md">
                
                <!-- Product Thumbnail (square matching Figma cart wireframe) -->
                <div class="w-18 h-18 rounded-2xl bg-[#2D2D33] flex items-center justify-center p-2 flex-shrink-0">
                  <img 
                    [src]="item.product.images[0]" 
                    [alt]="item.product.name" 
                    class="w-full h-full object-contain filter drop-shadow-md" />
                </div>

                <!-- Product Details -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-1">
                    <div>
                      <h4 class="text-sm font-bold text-white tracking-tight truncate">{{ item.product.name }}</h4>
                      <div class="flex items-center gap-2 mt-0.5">
                        <span class="w-2 h-2 rounded-full" [style.backgroundColor]="item.selectedColor.hex"></span>
                        <span class="text-[11px] text-[#7E7E88]">{{ item.selectedColor.name }}</span>
                      </div>
                    </div>

                    <!-- Remove Item Button -->
                    <button 
                      (click)="cart.removeItem(item.product.id, item.selectedColor.name)"
                      class="text-white/30 hover:text-white/90 p-1 transition-colors">
                      <app-icon name="trash" [size]="15" color="#7E7E88"></app-icon>
                    </button>
                  </div>

                  <!-- Price & Quantity Controls -->
                  <div class="flex items-center justify-between mt-2.5">
                    <span class="text-xs font-black text-white">
                      \${{ item.product.price * item.quantity }}
                    </span>

                    <div class="flex items-center gap-2.5 bg-[#1A1A1E] px-2.5 py-1 rounded-full border border-white/10">
                      <button 
                        (click)="cart.updateQuantity(item.product.id, item.selectedColor.name, -1)"
                        class="text-white/60 hover:text-white text-xs font-bold active:scale-90 px-1">
                        -
                      </button>
                      <span class="text-xs font-bold text-white min-w-[12px] text-center">
                        {{ item.quantity }}
                      </span>
                      <button 
                        (click)="cart.updateQuantity(item.product.id, item.selectedColor.name, 1)"
                        class="text-white/60 hover:text-white text-xs font-bold active:scale-90 px-1">
                        +
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            }
          </div>

          <!-- Promo Code Input (Backend Pending as instructed) -->
          <div class="bg-[#222226] rounded-[22px] p-3 flex items-center gap-2 border border-white/[0.05]">
            <input 
              type="text" 
              [(ngModel)]="couponInput" 
              placeholder="Promo code (Backend pending)" 
              class="flex-1 bg-transparent px-3 py-1 text-xs text-white placeholder-white/30 uppercase focus:outline-none" />
            <button 
              (click)="applyCoupon()"
              class="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white/80 transition-colors">
              Apply
            </button>
          </div>

          <!-- Price Breakdown Summary -->
          <div class="bg-[#222226] rounded-[24px] p-4.5 space-y-2.5 border border-white/[0.05]">
            <div class="flex justify-between text-xs text-[#7E7E88]">
              <span>Subtotal</span>
              <span class="text-white font-medium">\${{ cart.subtotal() }}</span>
            </div>
            <div class="flex justify-between text-xs text-[#7E7E88]">
              <span>Standard Express Shipping</span>
              <span class="text-white font-medium">{{ cart.deliveryFee() === 0 ? 'FREE' : '\$' + cart.deliveryFee() }}</span>
            </div>
            <div class="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-white">
              <span>Total</span>
              <span class="text-base font-black">\${{ cart.total() }}</span>
            </div>
          </div>

        } @else {
          <!-- Empty Cart State -->
          <div class="py-20 text-center space-y-4">
            <div class="w-16 h-16 rounded-full bg-[#222226] flex items-center justify-center mx-auto text-white/30">
              <app-icon name="cart" [size]="28" color="#7E7E88"></app-icon>
            </div>
            <div class="space-y-1">
              <p class="text-base font-bold text-white">Your cart is empty</p>
              <p class="text-xs text-[#7E7E88]">Discover high-end studio & wireless headphones</p>
            </div>
            <button 
              (click)="goToExplore()" 
              class="px-6 py-3 rounded-full bg-white text-black text-xs font-bold shadow-md hover:bg-neutral-200 transition-colors">
              Browse Audio Gear
            </button>
          </div>
        }

      </div>

      <!-- Sticky Bottom Checkout Bar (Completely Unobstructed) -->
      @if (cart.items().length > 0) {
        <div class="fixed bottom-4 left-0 right-0 max-w-[430px] mx-auto px-5 z-40 select-none">
          <button 
            (click)="proceedToCheckout()"
            class="w-full py-4 rounded-full bg-white text-black font-extrabold text-sm tracking-wide shadow-2xl hover:bg-neutral-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span>Proceed to Checkout (\${{ cart.total() }})</span>
            <app-icon name="arrow-right" [size]="16" color="#000000" [strokeWidth]="2.5"></app-icon>
          </button>
        </div>
      }

    </div>
  `
})
export class CartPage {
  cart = inject(CartService);
  private router = inject(Router);

  couponInput = '';

  applyCoupon() {
    this.cart.applyPromoCode(this.couponInput);
  }

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }

  goToExplore() {
    this.router.navigate(['/home']);
  }
}
