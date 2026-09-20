import { Component, inject } from '@angular/core';
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
    <div class="w-full min-h-screen bg-[#141416] text-white flex flex-col pb-28 select-none animate-fade-in">
      
      <!-- Top Brand Navbar (matches xwCBv8L_.jpg) -->
      <app-navbar></app-navbar>

      <div class="px-5 space-y-5 pt-1">
        
        <!-- Search Bar with Filter Sliders Icon (matches xwCBv8L_.jpg) -->
        <div class="relative flex items-center gap-2.5">
          <div class="relative flex-1 flex items-center">
            <div class="absolute left-4 flex items-center pointer-events-none text-white/40">
              <app-icon name="search" [size]="18" color="#8E8E93"></app-icon>
            </div>
            <input 
              type="text" 
              [ngModel]="productService.searchQuery()" 
              (ngModelChange)="productService.setSearchQuery($event)"
              placeholder="Search audio gear..." 
              class="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#232328] border border-white/[0.08] text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/40 transition-colors" />
            @if (productService.searchQuery()) {
              <button 
                (click)="productService.setSearchQuery('')"
                class="absolute right-4 w-5 h-5 rounded-full bg-white/20 text-white/80 hover:text-white flex items-center justify-center text-xs">
                ✕
              </button>
            }
          </div>

          <!-- Sliders / Filter Action Button -->
          <button 
            (click)="toggleFilterDrawer()"
            class="w-12 h-12 rounded-full bg-[#232328] border border-white/[0.08] flex items-center justify-center text-white/80 hover:text-white active:scale-95 transition-all">
            <app-icon name="sliders" [size]="18" color="#FFFFFF"></app-icon>
          </button>
        </div>

        <!-- Horizontal Brand Filter Pills (matches xwCBv8L_.jpg: All, JBL, Bose, Sony, Skullcandy) -->
        <div class="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1 -mx-5 px-5">
          @for (brand of productService.brands; track brand) {
            <button 
              (click)="productService.setBrand(brand)"
              class="px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200"
              [ngClass]="productService.selectedBrand() === brand ? 'pill-active shadow-md' : 'pill-inactive'">
              {{ brand }}
            </button>
          }
        </div>

        <!-- Products Feed Section (matches xwCBv8L_.jpg cards list) -->
        <div class="space-y-4 pt-1">
          @for (product of productService.products(); track product.id) {
            <app-product-card [product]="product"></app-product-card>
          } @empty {
            <div class="py-16 text-center space-y-3">
              <div class="w-14 h-14 rounded-full bg-[#232328] flex items-center justify-center mx-auto text-white/30">
                <app-icon name="search" [size]="24" color="#8E8E93"></app-icon>
              </div>
              <p class="text-sm font-semibold text-white">No headphones found</p>
              <p class="text-xs text-[#8E8E93]">Try searching for another model or brand</p>
              <button 
                (click)="resetFilters()" 
                class="mt-2 px-4 py-2 rounded-full bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-colors">
                Reset Filters
              </button>
            </div>
          }
        </div>

      </div>

    </div>
  `
})
export class HomePage {
  productService = inject(ProductService);
  cartService = inject(CartService);

  toggleFilterDrawer() {
    this.cartService.showToast('Audio filters: Frequency response, ANC level');
  }

  resetFilters() {
    this.productService.setBrand('All');
    this.productService.setSearchQuery('');
  }
}
