import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, IconComponent],
  template: `
    <div class="w-full min-h-screen bg-[#141416] text-white flex flex-col pb-36 select-none animate-fade-in">
      
      <!-- Top Navbar (matches Figma 67:2 check out wireframe) -->
      <app-navbar 
        [title]="'Checkout'" 
        [showBack]="true"
        backUrl="/cart">
      </app-navbar>

      <div class="px-5 space-y-4 pt-1 flex-1">
        
        <!-- Section 1: Delivery Address (matches top card in 67:2 wireframe) -->
        <div class="bg-[#222226] rounded-[24px] p-5 space-y-2.5 border border-white/[0.06] shadow-md">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider">Shipping Address</span>
            <button (click)="openAddressEdit()" class="text-xs text-white underline font-semibold hover:text-white/80">Edit</button>
          </div>
          <div class="flex items-start gap-3 pt-1">
            <div class="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 text-white mt-0.5">
              <app-icon name="map-pin" [size]="18" color="#FFFFFF"></app-icon>
            </div>
            <div>
              <p class="text-xs font-bold text-white">{{ auth.currentUser()?.name || 'Alex Rivera' }}</p>
              <p class="text-xs text-[#8E8E93] mt-0.5 leading-relaxed">{{ auth.currentUser()?.address || '742 Evergreen Terrace, Springfield, OR' }}</p>
              <p class="text-[11px] text-white/50 mt-1">{{ auth.currentUser()?.phone || '+1 (555) 234-8921' }}</p>
            </div>
          </div>
        </div>

        <!-- Section 2: Delivery Speed Option (matches middle pill 1) -->
        <div class="bg-[#222226] rounded-[24px] p-5 space-y-3 border border-white/[0.06] shadow-md">
          <span class="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider">Delivery Speed</span>
          
          <div class="grid grid-cols-2 gap-3">
            <button 
              (click)="selectedShipping = 'standard'"
              class="p-3.5 rounded-2xl border text-left transition-all"
              [ngClass]="selectedShipping === 'standard' ? 'bg-[#2E2E35] border-white text-white shadow-md' : 'bg-[#1C1C20] border-white/5 text-white/60'">
              <p class="text-xs font-bold">Standard</p>
              <p class="text-[11px] text-[#8E8E93] mt-0.5">3-5 Business Days</p>
              <p class="text-xs font-bold text-white mt-2">FREE</p>
            </button>

            <button 
              (click)="selectedShipping = 'express'"
              class="p-3.5 rounded-2xl border text-left transition-all"
              [ngClass]="selectedShipping === 'express' ? 'bg-[#2E2E35] border-white text-white shadow-md' : 'bg-[#1C1C20] border-white/5 text-white/60'">
              <p class="text-xs font-bold">Acoustic Air</p>
              <p class="text-[11px] text-[#8E8E93] mt-0.5">Next Day Priority</p>
              <p class="text-xs font-bold text-white mt-2">+\$15</p>
            </button>
          </div>
        </div>

        <!-- Section 3: Payment Method (matches middle pill 2) -->
        <div class="bg-[#222226] rounded-[24px] p-5 space-y-3 border border-white/[0.06] shadow-md">
          <span class="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider">Payment Method</span>

          <div class="space-y-2">
            <button 
              (click)="selectedPayment = 'apple_pay'"
              class="w-full p-3.5 rounded-2xl border flex items-center justify-between transition-all"
              [ngClass]="selectedPayment === 'apple_pay' ? 'bg-[#2E2E35] border-white text-white' : 'bg-[#1C1C20] border-white/5 text-white/70'">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                  
                </div>
                <span class="text-xs font-bold">Apple Pay</span>
              </div>
              <span class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    [ngClass]="selectedPayment === 'apple_pay' ? 'border-white bg-white' : 'border-white/30'">
                @if (selectedPayment === 'apple_pay') {
                  <span class="w-1.5 h-1.5 rounded-full bg-black"></span>
                }
              </span>
            </button>

            <button 
              (click)="selectedPayment = 'card'"
              class="w-full p-3.5 rounded-2xl border flex items-center justify-between transition-all"
              [ngClass]="selectedPayment === 'card' ? 'bg-[#2E2E35] border-white text-white' : 'bg-[#1C1C20] border-white/5 text-white/70'">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-[#3B82F6]/20 text-blue-400 flex items-center justify-center">
                  <app-icon name="credit-card" [size]="16" color="#60A5FA"></app-icon>
                </div>
                <div>
                  <span class="text-xs font-bold block">Credit Card</span>
                  <span class="text-[10px] text-[#8E8E93]">Mastercard •••• 4242</span>
                </div>
              </div>
              <span class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    [ngClass]="selectedPayment === 'card' ? 'border-white bg-white' : 'border-white/30'">
                @if (selectedPayment === 'card') {
                  <span class="w-1.5 h-1.5 rounded-full bg-black"></span>
                }
              </span>
            </button>
          </div>
        </div>

        <!-- Section 4: Order Items Preview & Cost (matches large bottom card in 67:2 wireframe) -->
        <div class="bg-[#222226] rounded-[24px] p-5 space-y-3 border border-white/[0.06] shadow-md">
          <span class="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider">Order Items ({{ cart.totalCount() }})</span>

          <div class="space-y-2">
            @for (item of cart.items(); track item.product.id) {
              <div class="flex items-center justify-between text-xs py-1">
                <span class="text-white/85 truncate max-w-[200px]">{{ item.product.name }} × {{ item.quantity }}</span>
                <span class="font-bold text-white">\${{ item.product.price * item.quantity }}</span>
              </div>
            }
          </div>

          <div class="border-t border-white/10 pt-3 space-y-1.5 text-xs text-[#8E8E93]">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span class="text-white font-medium">\${{ cart.subtotal() }}</span>
            </div>
            <div class="flex justify-between">
              <span>Delivery</span>
              <span class="text-white font-medium">{{ shippingCost === 0 ? 'FREE' : '\$' + shippingCost }}</span>
            </div>
            <div class="flex justify-between text-base font-black text-white pt-2 border-t border-white/10">
              <span>Grand Total</span>
              <span class="text-lg font-black">\${{ calculatedTotal }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Sticky Place Order Action Bar -->
      <div class="fixed bottom-4 left-0 right-0 max-w-[420px] mx-auto px-5 z-40 select-none">
        <button 
          (click)="placeOrder()"
          [disabled]="isSubmitting()"
          class="w-full py-4 rounded-full bg-white text-black font-extrabold text-sm tracking-wide shadow-xl hover:bg-neutral-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer">
          @if (isSubmitting()) {
            <span class="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
            <span>Processing Payment...</span>
          } @else {
            <span>Confirm & Pay \${{ calculatedTotal }}</span>
          }
        </button>
      </div>

    </div>
  `
})
export class CheckoutPage {
  cart = inject(CartService);
  orderService = inject(OrderService);
  auth = inject(AuthService);
  private router = inject(Router);

  selectedShipping: 'standard' | 'express' = 'standard';
  selectedPayment: 'apple_pay' | 'card' = 'apple_pay';
  isSubmitting = signal<boolean>(false);

  get shippingCost(): number {
    return this.selectedShipping === 'express' ? 15 : this.cart.deliveryFee();
  }

  get calculatedTotal(): number {
    return Math.max(0, this.cart.subtotal() - this.cart.discountAmount() + this.shippingCost);
  }

  openAddressEdit() {
    this.router.navigate(['/profile']);
  }

  placeOrder() {
    if (this.cart.items().length === 0) return;

    this.isSubmitting.set(true);

    setTimeout(() => {
      const shippingAddress = this.auth.currentUser()?.address || '742 Evergreen Terrace, Springfield, OR';
      const paymentMethod = this.selectedPayment === 'apple_pay' ? 'Apple Pay' : 'Mastercard •••• 4242';

      this.orderService.createOrder(
        this.cart.items(),
        this.cart.subtotal(),
        this.cart.discountAmount(),
        this.shippingCost,
        this.calculatedTotal,
        shippingAddress,
        paymentMethod
      );

      this.cart.clearCart();
      this.isSubmitting.set(false);
      this.router.navigate(['/receipt']);
    }, 1200);
  }
}
