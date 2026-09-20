import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Order } from '../../models';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <div class="w-full min-h-screen bg-[#141416] text-white flex flex-col pb-28 select-none animate-fade-in relative">
      
      <!-- Top Navbar (matches Figma 71:22 orders wireframe back arrow & title) -->
      <app-navbar 
        [title]="'Orders'" 
        [showBack]="true"
        backUrl="/home">
      </app-navbar>

      <div class="px-5 space-y-4 pt-1 flex-1">
        
        <!-- Orders Cards List (Spot-on match for Figma 71:22 wireframe) -->
        <div class="space-y-4 pt-1">
          @for (order of orderService.orders(); track order.id) {
            <div class="bg-[#222226] rounded-[26px] p-4.5 space-y-3.5 border border-white/[0.05] shadow-md">
              
              <!-- 1. Top Header: Store Name & Status Badge (matches "name of the store" in Figma 71:22) -->
              <div class="flex items-center justify-between text-xs pb-1 border-b border-white/[0.04]">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-white tracking-wide text-xs">VibraTune Official Store</span>
                </div>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      [ngClass]="order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'">
                  {{ order.status }}
                </span>
              </div>

              <!-- 2. Main Row: Left Square Thumbnail + Right Info & Price (matches Figma 71:22) -->
              <div class="flex items-center gap-3.5">
                <!-- Square Thumbnail (matches 99x93 image of product in 71:22) -->
                <div class="w-20 h-20 rounded-2xl bg-[#2D2D33] p-2 flex items-center justify-center flex-shrink-0">
                  <img 
                    [src]="order.items[0].product.images[0]" 
                    [alt]="order.items[0].product.name" 
                    class="w-full h-full object-contain filter drop-shadow-sm" />
                </div>

                <!-- Right Info & Price (matches "name of order" & "total item and price" in 71:22) -->
                <div class="flex-1 min-w-0 flex flex-col justify-between h-20 py-0.5">
                  <div>
                    <h4 class="text-sm font-bold text-white truncate">{{ order.items[0].product.name }}</h4>
                    <p class="text-[11px] text-[#8E8E93] mt-0.5">
                      {{ order.items[0].selectedColor.name }} · {{ order.items.length }} {{ order.items.length === 1 ? 'Item' : 'Items' }}
                    </p>
                  </div>

                  <div class="flex items-baseline justify-between pt-1">
                    <span class="text-[11px] text-[#8E8E93]">Total Amount</span>
                    <span class="text-xs font-black text-white tracking-tight">\${{ order.total }}</span>
                  </div>
                </div>
              </div>

              <!-- 3. Bottom Full-Width Pill: Expected Delivery Date & Compact Action (matches "expected delivery dater" in 71:22) -->
              <div class="rounded-2xl bg-[#1A1A1E] border border-white/5 px-3.5 py-2.5 flex items-center justify-between text-xs">
                <span class="text-xs font-medium text-white/90">
                  {{ order.status === 'Delivered' ? 'Delivered: ' + order.date : 'Expected: Friday, Sep 25' }}
                </span>

                <div class="flex items-center gap-1.5">
                  <button 
                    (click)="viewReceipt(order)"
                    class="px-2.5 py-1 rounded-full text-[11px] text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                    Receipt
                  </button>
                  <button 
                    (click)="openTrackingModal(order)"
                    class="px-3 py-1 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-[11px] font-bold transition-all active:scale-95 shadow-xs">
                    Track
                  </button>
                </div>
              </div>

            </div>
          }
        </div>

      </div>

      <!-- Usable Live Tracking Modal -->
      @if (activeTrackOrder()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-xs animate-fade-in"
             (click)="activeTrackOrder.set(null)">
          <div 
            class="w-full max-w-sm bg-[#1E1E22] rounded-[32px] p-6 space-y-5 border border-white/10 shadow-2xl"
            (click)="$event.stopPropagation()">
            
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-white">Live Tracking Details</h3>
                <p class="text-[11px] text-[#7E7E88]">Acoustic Air Express Courier</p>
              </div>
              <button (click)="activeTrackOrder.set(null)" class="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center text-xs">✕</button>
            </div>

            <!-- Tracking Timeline -->
            <div class="space-y-4 pt-1">
              <div class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-[10px]">✓</div>
                <div>
                  <p class="text-xs font-bold text-white">Order Confirmed</p>
                  <p class="text-[10px] text-[#7E7E88]">Audio warehouse packaged</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-[10px]">✓</div>
                <div>
                  <p class="text-xs font-bold text-white">In Transit</p>
                  <p class="text-[10px] text-[#7E7E88]">Departed sorting facility</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">●</div>
                <div>
                  <p class="text-xs font-bold text-white">Out for Delivery</p>
                  <p class="text-[10px] text-[#7E7E88]">With courier for delivery today</p>
                </div>
              </div>
            </div>

            <button 
              (click)="activeTrackOrder.set(null)"
              class="w-full py-3 rounded-full bg-white text-black text-xs font-bold shadow-md hover:bg-neutral-200 transition-colors">
              Close
            </button>

          </div>
        </div>
      }

    </div>
  `
})
export class OrdersPage {
  orderService = inject(OrderService);
  private router = inject(Router);

  activeTrackOrder = signal<Order | null>(null);

  openTrackingModal(order: Order) {
    this.activeTrackOrder.set(order);
  }

  viewReceipt(order: Order) {
    this.orderService.latestOrder.set(order);
    this.router.navigate(['/receipt']);
  }
}
