import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IconComponent } from '../../components/icon/icon.component';
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
        
        <!-- Orders Cards List (Spot-on match for Figma 71:22 wireframe structure) -->
        <div class="space-y-4 pt-1">
          @for (order of orderService.orders(); track order.id) {
            <div class="bg-[#222226] rounded-[24px] p-4.5 space-y-3.5 border border-white/[0.05] shadow-lg">
              
              <!-- 1. Top Header Line (matches thin top bar in 71:22 wireframe) -->
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold text-[#8E8E93] tracking-wide">{{ order.orderNumber }} · {{ order.date }}</span>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      [ngClass]="order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'">
                  {{ order.status }}
                </span>
              </div>

              <!-- 2. Main Row: Left Square Thumbnail + Right Info & Price (matches 71:22 wireframe) -->
              <div class="flex items-center gap-4">
                <!-- Large Square Thumbnail (matches square in 71:22) -->
                <div class="w-20 h-20 rounded-2xl bg-[#2D2D33] p-2 flex items-center justify-center flex-shrink-0">
                  <img 
                    [src]="order.items[0].product.images[0]" 
                    [alt]="order.items[0].product.name" 
                    class="w-full h-full object-contain filter drop-shadow-sm" />
                </div>

                <!-- Right Info & Price (matches right lines in 71:22) -->
                <div class="flex-1 min-w-0 flex flex-col justify-between h-20 py-0.5">
                  <div>
                    <h4 class="text-sm font-bold text-white truncate">{{ order.items[0].product.name }}</h4>
                    <p class="text-[11px] text-[#7E7E88] mt-0.5">
                      {{ order.items[0].selectedColor.name }} · {{ order.items.length }} {{ order.items.length === 1 ? 'Item' : 'Items' }}
                    </p>
                  </div>

                  <div class="flex items-center justify-between">
                    <span class="text-xs text-[#7E7E88]">Total Amount</span>
                    <span class="text-sm font-extrabold text-white tracking-tight">\${{ order.total }}</span>
                  </div>
                </div>
              </div>

              <!-- 3. Wide Bottom Button (matches full-width bottom pill in 71:22 wireframe) -->
              <div class="pt-1 flex gap-2">
                <button 
                  (click)="openTrackingModal(order)"
                  class="flex-1 py-3 rounded-full bg-[#323238] hover:bg-[#3E3E46] text-white text-xs font-bold text-center tracking-wide transition-colors active:scale-[0.98] border border-white/5">
                  Track Order
                </button>
                <button 
                  (click)="viewReceipt(order)"
                  class="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors">
                  Receipt
                </button>
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
                <h3 class="text-sm font-bold text-white">Tracking {{ activeTrackOrder()?.orderNumber }}</h3>
                <p class="text-[11px] text-[#7E7E88] mt-0.5">Acoustic Air Express</p>
              </div>
              <button (click)="activeTrackOrder.set(null)" class="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center text-xs">✕</button>
            </div>

            <!-- Tracking Timeline -->
            <div class="space-y-4 pt-2">
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs">✓</div>
                <div>
                  <p class="text-xs font-bold text-white">Order Confirmed</p>
                  <p class="text-[11px] text-[#7E7E88]">Audio warehouse packaged</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs">✓</div>
                <div>
                  <p class="text-xs font-bold text-white">In Transit</p>
                  <p class="text-[11px] text-[#7E7E88]">Departed sorting facility</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">●</div>
                <div>
                  <p class="text-xs font-bold text-white">Out for Delivery</p>
                  <p class="text-[11px] text-[#7E7E88]">With local courier</p>
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
