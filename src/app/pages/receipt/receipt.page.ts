import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-receipt-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, IconComponent],
  template: `
    <div class="w-full min-h-screen bg-[#141416] text-white flex flex-col justify-between p-5 pb-10 select-none animate-fade-in">
      
      <!-- Top Navbar (matches Figma 90:2 receipt wireframe) -->
      <app-navbar 
        [title]="'Receipt'" 
        [showBack]="true"
        backUrl="/home">
      </app-navbar>

      <!-- Receipt Perforated Ticket Card (matches Figma 90:2 receipt wireframe) -->
      <div class="relative w-full max-w-sm mx-auto my-auto pt-10">
        
        <!-- Top Floating Circle Badge (matches avatar/badge in 90:2 wireframe) -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div class="w-20 h-20 rounded-full bg-[#232328] border-4 border-[#141416] flex items-center justify-center shadow-2xl">
            <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black">
              <app-icon name="check" [size]="24" color="#000000" [strokeWidth]="3"></app-icon>
            </div>
          </div>
        </div>

        <!-- Main White Ticket Body -->
        <div class="relative bg-white text-[#141416] rounded-[32px] pt-14 pb-8 px-6 shadow-2xl space-y-5 overflow-hidden">
          
          <!-- Header info -->
          <div class="text-center space-y-1">
            <h2 class="text-lg font-black tracking-tight text-black">Payment Successful!</h2>
            <p class="text-xs text-[#8E8E93]">Thank you for choosing VibraTune</p>
          </div>

          <!-- Order meta box (matches top rounded container in 90:2 wireframe) -->
          <div class="bg-[#F5F5F7] rounded-2xl p-3.5 space-y-1.5 text-xs">
            <div class="flex justify-between">
              <span class="text-[#8E8E93] font-medium">Order Reference</span>
              <span class="font-bold text-black">{{ order.orderNumber }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#8E8E93] font-medium">Order Date</span>
              <span class="font-semibold text-black">{{ order.date }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-[#8E8E93] font-medium">Payment</span>
              <span class="font-semibold text-black">{{ order.paymentMethod }}</span>
            </div>
          </div>

          <!-- Perforated Cutout Divider (matches circular notches & dashed line in 90:2 wireframe) -->
          <div class="relative flex items-center justify-between -mx-6 my-4">
            <div class="w-6 h-6 rounded-full bg-[#141416] -ml-3"></div>
            <div class="flex-1 border-b-2 border-dashed border-black/10 mx-2"></div>
            <div class="w-6 h-6 rounded-full bg-[#141416] -mr-3"></div>
          </div>

          <!-- Items Summary box (matches bottom container in 90:2 wireframe) -->
          <div class="space-y-2.5">
            <p class="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider">Itemized Breakdown</p>
            
            <div class="space-y-2 max-h-36 overflow-y-auto pr-1">
              @for (item of order.items; track item.product.id) {
                <div class="flex justify-between text-xs">
                  <span class="text-[#3A3A3E] truncate max-w-[180px]">
                    {{ item.product.name }} (×{{ item.quantity }})
                  </span>
                  <span class="font-bold text-black">\${{ item.product.price * item.quantity }}</span>
                </div>
              }
            </div>

            <div class="border-t border-black/10 pt-2.5 space-y-1 text-xs">
              <div class="flex justify-between text-[#8E8E93]">
                <span>Subtotal</span>
                <span>\${{ order.subtotal }}</span>
              </div>
              <div class="flex justify-between text-[#8E8E93]">
                <span>Shipping</span>
                <span>{{ order.deliveryFee === 0 ? 'FREE' : '\$' + order.deliveryFee }}</span>
              </div>
              <div class="flex justify-between text-sm font-black text-black pt-1">
                <span>Total Paid</span>
                <span class="text-base font-black">\${{ order.total }}</span>
              </div>
            </div>
          </div>

          <!-- Bottom Button inside Card (matches dark pill button in 90:2 wireframe) -->
          <div class="pt-2">
            <button 
              (click)="goHome()"
              class="w-full py-3.5 rounded-full bg-[#141416] text-white text-xs font-extrabold tracking-wide hover:bg-black active:scale-[0.98] transition-all shadow-md">
              Back to Home
            </button>
          </div>

        </div>

      </div>

      <!-- Action Footer -->
      <div class="text-center pt-4">
        <button 
          (click)="viewOrders()" 
          class="text-xs text-white/70 hover:text-white font-semibold underline">
          View All Orders & Tracking
        </button>
      </div>

    </div>
  `
})
export class ReceiptPage {
  private orderService = inject(OrderService);
  private router = inject(Router);

  order = this.orderService.latestOrder() || this.orderService.orders()[0];

  goHome() {
    this.router.navigate(['/home']);
  }

  viewOrders() {
    this.router.navigate(['/orders']);
  }
}
