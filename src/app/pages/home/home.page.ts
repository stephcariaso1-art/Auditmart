import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { IconComponent } from '../../components/icon/icon.component';
import { CartService } from '../../services/cart.service';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, ProductCardComponent, IconComponent],
  template: `
    <div class="w-full min-h-screen bg-[#141416] text-white flex flex-col pb-32 select-none animate-fade-in relative">
      
      <!-- Top Brand Navbar: Menu, audiMart, Notification Bell -->
      <app-navbar></app-navbar>

      <div class="px-5 space-y-4 pt-1">
        
        <!-- Search Bar with Working Sort/Filter Icon (matches video script & user request) -->
        <div class="relative flex items-center">
          <div class="absolute left-4 flex items-center pointer-events-none text-[#7E7E88]">
            <app-icon name="search" [size]="17" color="#7E7E88"></app-icon>
          </div>
          
          <input 
            type="text" 
            [ngModel]="productService.searchQuery()" 
            (ngModelChange)="productService.setSearchQuery($event)"
            placeholder="Search audio products..." 
            class="w-full pl-11 pr-12 py-3.5 rounded-2xl bg-[#222226] border border-white/[0.06] text-white placeholder-[#6E6E78] text-xs font-medium focus:outline-none focus:border-white/30 transition-colors" />

          <!-- Working Sort & Filter Icon on Far Right -->
          <button 
            (click)="showFilterModal.set(true)"
            title="Sort and filter products"
            class="absolute right-2.5 w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer"
            [ngClass]="isSortActive() ? 'bg-white text-black shadow-md' : 'text-[#8E8E93] hover:text-white bg-transparent'">
            <app-icon name="sliders" [size]="16" [color]="isSortActive() ? '#000000' : '#8E8E93'"></app-icon>
            @if (isSortActive()) {
              <span class="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#222226]"></span>
            }
          </button>
        </div>

        <!-- Active Sort Pill Banner (visible when sort is applied) -->
        @if (sortBy() !== 'default') {
          <div class="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#222226] border border-white/10 text-xs">
            <span class="text-[#8E8E93] text-[11px]">
              Sorted by: <strong class="text-white">{{ getSortLabel(sortBy()) }}</strong>
            </span>
            <button 
              (click)="setSort('default')" 
              class="text-[11px] text-white/60 hover:text-white underline cursor-pointer">
              Reset Sort
            </button>
          </div>
        }

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

        <!-- Available Audio Products Feed (Large rectangles with smaller price boxes) -->
        <div class="pt-1 flex flex-col gap-4">
          @for (product of filteredProducts(); track product.id) {
            <app-product-card [product]="product"></app-product-card>
          } @empty {
            <div class="py-16 text-center space-y-3">
              <div class="w-12 h-12 rounded-full bg-[#222226] flex items-center justify-center mx-auto text-white/30">
                <app-icon name="search" [size]="20" color="#7E7E88"></app-icon>
              </div>
              <p class="text-sm font-bold text-white">No products found</p>
              <p class="text-xs text-[#7E7E88]">Try changing your sort or category filter</p>
              <button 
                (click)="resetFilters()" 
                class="mt-2 px-5 py-2 rounded-full bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-colors cursor-pointer">
                Reset All Filters
              </button>
            </div>
          }
        </div>

      </div>

      <!-- Working Sort & Filter Drawer / Modal -->
      @if (showFilterModal()) {
        <div class="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-xs animate-fade-in"
             (click)="showFilterModal.set(false)">
          <div 
            class="w-full max-w-[430px] bg-[#1E1E22] rounded-t-[32px] p-6 space-y-5 border-t border-white/10 shadow-2xl"
            (click)="$event.stopPropagation()">
            
            <div class="w-10 h-1 rounded-full bg-white/20 mx-auto -mt-1"></div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-bold text-white">Sort & Filter</h3>
                <p class="text-[11px] text-[#7E7E88]">Arrange products according to your preference</p>
              </div>
              <button 
                (click)="resetFilters()" 
                class="text-xs text-[#8E8E93] hover:text-white underline cursor-pointer">
                Reset All
              </button>
            </div>

            <!-- Sort By Options -->
            <div class="space-y-2 pt-1">
              <label class="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]">Sort Products By</label>
              
              <div class="grid grid-cols-2 gap-2">
                <!-- Option 1: Featured / Default -->
                <button 
                  (click)="setSort('default')"
                  class="p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer"
                  [ngClass]="sortBy() === 'default' ? 'bg-white text-black border-white font-bold shadow-md' : 'bg-[#28282E] text-white/80 border-white/5 hover:border-white/20'">
                  <span class="text-xs">Featured</span>
                  @if (sortBy() === 'default') {
                    <span class="text-xs font-black">✓</span>
                  }
                </button>

                <!-- Option 2: Price Low to High -->
                <button 
                  (click)="setSort('price-asc')"
                  class="p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer"
                  [ngClass]="sortBy() === 'price-asc' ? 'bg-white text-black border-white font-bold shadow-md' : 'bg-[#28282E] text-white/80 border-white/5 hover:border-white/20'">
                  <span class="text-xs">Price: Low to High</span>
                  @if (sortBy() === 'price-asc') {
                    <span class="text-xs font-black">✓</span>
                  }
                </button>

                <!-- Option 3: Price High to Low -->
                <button 
                  (click)="setSort('price-desc')"
                  class="p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer"
                  [ngClass]="sortBy() === 'price-desc' ? 'bg-white text-black border-white font-bold shadow-md' : 'bg-[#28282E] text-white/80 border-white/5 hover:border-white/20'">
                  <span class="text-xs">Price: High to Low</span>
                  @if (sortBy() === 'price-desc') {
                    <span class="text-xs font-black">✓</span>
                  }
                </button>

                <!-- Option 4: Top Rated -->
                <button 
                  (click)="setSort('rating')"
                  class="p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer"
                  [ngClass]="sortBy() === 'rating' ? 'bg-white text-black border-white font-bold shadow-md' : 'bg-[#28282E] text-white/80 border-white/5 hover:border-white/20'">
                  <span class="text-xs">Top Customer Rating</span>
                  @if (sortBy() === 'rating') {
                    <span class="text-xs font-black">✓</span>
                  }
                </button>
              </div>
            </div>

            <!-- Price Range Filter -->
            <div class="space-y-2 pt-1 border-t border-white/[0.06]">
              <div class="flex justify-between items-center text-xs">
                <span class="text-[#8E8E93] font-bold uppercase text-[11px] tracking-wider">Maximum Price</span>
                <span class="font-extrabold text-white font-mono text-sm">\${{ maxPrice() }}</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="250" 
                step="5"
                [ngModel]="maxPrice()" 
                (ngModelChange)="maxPrice.set($event)"
                class="w-full accent-white cursor-pointer" />
              <div class="flex justify-between text-[10px] text-[#7E7E88]">
                <span>\$50</span>
                <span>\$150</span>
                <span>\$250+</span>
              </div>
            </div>

            <!-- Apply Button -->
            <div class="pt-2">
              <button 
                (click)="showFilterModal.set(false)"
                class="w-full py-3.5 rounded-full bg-white text-black text-xs font-extrabold shadow-xl hover:bg-neutral-200 transition-colors cursor-pointer">
                Apply Sort & Filters ({{ filteredProducts().length }} items)
              </button>
            </div>

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
  sortBy = signal<SortOption>('default');
  maxPrice = signal<number>(250);

  isSortActive(): boolean {
    return this.sortBy() !== 'default' || this.maxPrice() < 250;
  }

  getSortLabel(option: SortOption): string {
    switch (option) {
      case 'price-asc': return 'Price: Low to High';
      case 'price-desc': return 'Price: High to Low';
      case 'rating': return 'Top Rated';
      case 'name': return 'Name (A-Z)';
      default: return 'Featured';
    }
  }

  setSort(option: SortOption) {
    this.sortBy.set(option);
    if (option !== 'default') {
      this.cartService.showToast(`Sorted by ${this.getSortLabel(option)}`);
    }
  }

  filteredProducts() {
    let list = this.productService.products().filter(p => p.price <= this.maxPrice());

    switch (this.sortBy()) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'name':
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }

  resetFilters() {
    this.productService.setCategory('All');
    this.productService.setSearchQuery('');
    this.sortBy.set('default');
    this.maxPrice.set(250);
    this.cartService.showToast('Filters reset to default');
  }
}
