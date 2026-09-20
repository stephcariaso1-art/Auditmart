import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  template: `
    <div class="w-full min-h-screen bg-[#141416] text-white flex flex-col pb-32 select-none animate-fade-in">
      
      <!-- Top Navbar (matches Figma 71:22 orders wireframe) -->
      <app-navbar 
        [title]="'Orders History'" 
        [showBack]="true"
        backUrl="/home">
      </app-navbar>

      <div class="px-5 space-y-4 pt-1 flex-1">
        
        <!-- Status Tabs -->
        <div class="flex items-center gap-2 p-1 rounded-full bg-[#232328] border border-white/5">
          <button 
            (click)="activeTab = 'all'"
            class="flex-1 py-2 rounded-full text-xs font-bold transition-all"
            [ngClass]="activeTab === 'all' ? 'bg-white text-black shadow-sm' : 'text-white/50 hover:text-white'">
            All Orders
          </button>
          <button 
            (click)="activeTab = 'delivered'"
            class="flex-1 py-2 rounded-full text-xs font-bold transition-all"
            [ngClass]="activeTab === 'delivered' ? 'bg-white text-black shadow-sm' : 'text-white/50 hover:text-white'">
            Delivered
          </button>
        </div>

        <!-- Orders Cards Feed (matches Figma 71:22 orders page wireframe) -->
        <div class="space-y-3.5 pt-1">
          @for (order of filteredOrders; track order.id) {
            <div class="bg-[#232328] rounded-[24px] p-4.5 space-y-3.5 border border-white/[0.06] shadow-card">
              
              <!-- Order Header -->
              <div class="flex items-center justify-between border-b border-white/5 pb-2.5">
                <div>
                  <span class="text-xs font-black text-white tracking-wide">{{ order.orderNumber }}</span>
                  <span class="text-[11px] text-[#8E8E93] block">{{ order.date }}</span>
                </div>
                <span class="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase"
                      [ngClass]="order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'">
                  {{ order.status }}
                </span>
              </div>

              <!-- Product items preview -->
              <div class="space-y-2">
                @for (item of order.items; track item.product.id) {
                  <div class="flex items-center gap-3">
                    <div class="w-14 h-14 rounded-xl bg-[#2D2D33] p-1.5 flex items-center justify-center flex-shrink-0">
                      <img 
                        [src]="item.product.images[1] || item.product.images[0]" 
                        [alt]="item.product.name" 
                        class="w-full h-full object-contain filter drop-shadow-sm" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-xs font-bold text-white truncate">{{ item.product.name }}</h4>
                      <p class="text-[11px] text-[#8E8E93]">Qty: {{ item.quantity }} · {{ item.selectedColor.name }}</p>
                      <p class="text-xs font-extrabold text-white mt-0.5">\${{ item.product.price * item.quantity }}</p>
                    </div>
                  </div>
                }
              </div>

              <!-- Card Footer Action Buttons -->
              <div class="flex items-center justify-between pt-2 border-t border-white/5">
                <div class="text-xs">
                  <span class="text-[#8E8E93]">Total: </span>
                  <span class="font-extrabold text-white">\${{ order.total }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <button 
                    (click)="viewOrderReceipt(order)"
                    class="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold transition-colors">
                    Receipt
                  </button>
                  <button 
                    (click)="trackOrder(order)"
                    class="px-3.5 py-1.5 rounded-full bg-white text-black text-[11px] font-bold hover:bg-neutral-200 transition-colors">
                    Track
                  </button>
                </div>
              </div>

            </div>
          } @empty {
            <div class="py-16 text-center space-y-3">
              <p class="text-sm font-bold text-white">No orders found</p>
              <p class="text-xs text-[#8E8E93]">Place an order to see it tracked here</p>
            </div>
          }
        </div>

      </div>

    </div>
  `
})
export class OrdersPage {
  orderService = inject(OrderService);
  private router = inject(Router);

  activeTab: 'all' | 'delivered' = 'all';

  get filteredOrders() {
    const list = this.orderService.orders();
    if (this.activeTab === 'delivered') {
      return list.filter(o => o.status === 'Delivered');
    }
    return list;
  }

  viewOrderReceipt(order: any) {
    this.orderService.latestOrder.set(order);
    this.router.navigate(['/receipt']);
  }

  trackOrder(order: any) {
    alert(`Tracking order ${order.orderNumber}: Package in transit via Acoustic Air courier.`);
  }
}
