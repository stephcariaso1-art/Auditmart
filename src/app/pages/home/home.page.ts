import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { IconComponent } from '../../components/icon/icon.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, ProductCardComponent, IconComponent],
  template: `
    <div class="w-full min-h-screen bg-[#141416] text-white flex flex-col pb-32 select-none animate-fade-in relative">
      
      <!-- Top Brand Navbar: Menu, audiMart, Notification Bell -->
      <app-navbar></app-navbar>

      <div class="px-5 space-y-4 pt-1">
        
        <!-- Search Bar (matches video script: top search bar to find products quickly) -->
        <div class="relative flex items-center">
          <div class="absolute left-4 flex items-center pointer-events-none text-[#7E7E88]">
            <app-icon name="search" [size]="17" color="#7E7E88"></app-icon>
          </div>
          
          <input 
            type="text" 
            [ngModel]="productService.searchQuery()" 
            (ngModelChange)="productService.setSearchQuery($event)"
            placeholder="Search audio products..." 
            class="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-[#222226] border border-white/[0.06] text-white placeholder-[#6E6E78] text-xs font-medium focus:outline-none focus:border-white/30 transition-colors" />

          <!-- Sliders Filter Icon on Far Right -->
          <button 
            (click)="showFilterModal.set(true)"
            title="Filter by budget"
            class="absolute right-3.5 flex items-center text-[#7E7E88] hover:text-white transition-colors p-1 active:scale-90 cursor-pointer">
            <app-icon name="sliders" [size]="16" color="#8E8E93"></app-icon>
          </button>
        </div>

        <!-- Product Categories (matches video script: All, Headphones, Earphones, Speakers) -->
        <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 text-xs">
          @for (cat of productService.categories; track cat) {
            @if (productService.selectedCategory() === cat) {
              <!-- Active Category: Solid White Pill -->
              <button 
                (click)="productService.setCategory(cat)"
                class="px-5 py-2 rounded-full bg-white text-black font-extrabold whitespace-nowrap shadow-sm transition-all cursor-pointer">
                {{ cat }}
              </button>
            } @else {
              <!-- Inactive Category: Clean text link with hover feedback -->
              <button 
                (click)="productService.setCategory(cat)"
                class="px-4 py-2 rounded-full bg-[#222226] text-[#8E8E93] hover:text-white whitespace-nowrap transition-colors font-medium border border-white/[0.04] cursor-pointer">
                {{ cat }}
              </button>
            }
          }
        </div>

        <!-- Available Audio Products Feed (Large rectangles with smaller price boxes, matching script) -->
        <div class="pt-1 flex flex-col gap-4">
          @for (product of filteredProducts(); track product.id) {
            <app-product-card [product]="product"></app-product-card>
          } @empty {
            <div class="py-16 text-center space-y-3">
              <div class="w-12 h-12 rounded-full bg-[#222226] flex items-center justify-center mx-auto text-white/30">
                <app-icon name="search" [size]="20" color="#7E7E88"></app-icon>
              </div>
              <p class="text-sm font-bold text-white">No products found in {{ productService.selectedCategory() }}</p>
              <p class="text-xs text-[#7E7E88]">Try selecting "All" or adjusting your search</p>
              <button 
                (click)="resetFilters()" 
                class="mt-2 px-5 py-2 rounded-full bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-colors cursor-pointer">
                Reset Filters
              </button>
            </div>
          }
        </div>

      </div>

      <!-- Budget Filter Modal -->
      @if (showFilterModal()) {
        <div class="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-xs animate-fade-in"
             (click)="showFilterModal.set(false)">
          <div 
            class="w-full max-w-[430px] bg-[#1E1E22] rounded-t-[32px] p-6 space-y-5 border-t border-white/10 shadow-2xl"
            (click)="$event.stopPropagation()">
            
            <div class="w-10 h-1 rounded-full bg-white/20 mx-auto -mt-1"></div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-white">Filter by Budget</h3>
                <p class="text-[11px] text-[#7E7E88]">Select maximum price</p>
              </div>
              <button (click)="resetFilters()" class="text-xs text-[#7E7E88] hover:text-white underline">Reset</button>
            </div>

            <div class="space-y-2 pt-1">
              <div class="flex justify-between text-xs">
                <span class="text-[#8E8E93]">Max Price</span>
                <span class="font-bold text-white font-mono">\${{ maxPrice() }}</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="250" 
                step="5"
                [ngModel]="maxPrice()" 
                (ngModelChange)="maxPrice.set($event)"
                class="w-full accent-white cursor-pointer" />
            </div>

            <button 
              (click)="showFilterModal.set(false)"
              class="w-full py-3.5 rounded-full bg-white text-black text-xs font-bold shadow-md hover:bg-neutral-200 transition-colors cursor-pointer">
              Apply Filter
            </button>
          </div>
        </div>
      }

    </div>
  `
})
export class HomePage {
  productService = inject(ProductService);
  cartService = inject(CartService);

  showFilterModal = signal<boolean>(false);
  maxPrice = signal<number>(250);

  filteredProducts() {
    return this.productService.products().filter(p => p.price <= this.maxPrice());
  }

  resetFilters() {
    this.productService.setCategory('All');
    this.productService.setSearchQuery('');
    this.maxPrice.set(250);
  }
}
