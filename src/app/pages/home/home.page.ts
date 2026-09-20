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
      
      <!-- Top Brand Navbar: audiMart, Notification Bell (NO top-left icon) -->
      <app-navbar></app-navbar>

      <div class="px-5 space-y-4 pt-1">
        
        <!-- Search Bar with Highly Visible & Clickable Sort/Filter Button -->
        <div class="relative flex items-center">
          <div class="absolute left-4 flex items-center pointer-events-none text-[#7E7E88]">
            <app-icon name="search" [size]="17" color="#7E7E88"></app-icon>
          </div>
          
          <input 
            type="text" 
            [ngModel]="productService.searchQuery()" 
            (ngModelChange)="productService.setSearchQuery($event)"
            placeholder="Search audio products..." 
            class="w-full pl-11 pr-14 py-3.5 rounded-2xl bg-[#222226] border border-white/[0.06] text-white placeholder-[#6E6E78] text-xs font-medium focus:outline-none focus:border-white/30 transition-colors" />

          <!-- Highly Clickable Sort & Filter Button (fixed hit area & high z-index) -->
          <button 
            type="button"
            (click)="toggleFilterModal($event)"
            title="Sort and filter products"
            class="absolute right-1.5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer pointer-events-auto border active:scale-90"
            [ngClass]="isSortActive() ? 'bg-white text-black border-white shadow-md' : 'bg-[#2A2A30] hover:bg-[#35353D] text-white border-white/10'">
            <app-icon name="sliders" [size]="18" [color]="isSortActive() ? '#000000' : '#FFFFFF'" classNames="pointer-events-none"></app-icon>
            @if (isSortActive()) {
              <span class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#222226]"></span>
            }
          </button>
        </div>

        <!-- Quick Sort Pills Bar -->
        <div class="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5 text-xs">
          <div class="flex items-center gap-2">
            <button 
              type="button"
              (click)="toggleFilterModal($event)"
              class="px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-[11px] font-semibold transition-all cursor-pointer"
              [ngClass]="isSortActive() ? 'bg-white text-black border-white' : 'bg-[#222226] text-[#8E8E93] hover:text-white border-white/5'">
              <app-icon name="sliders" [size]="13" [color]="isSortActive() ? '#000000' : '#8E8E93'"></app-icon>
              <span>{{ sortBy() === 'default' ? 'Sort Products' : getSortLabel(sortBy()) }}</span>
            </button>
          </div>

          @if (sortBy() !== 'default') {
            <button 
              type="button"
              (click)="setSort('default')"
              class="text-[10px] text-white/50 hover:text-white underline cursor-pointer">
              Reset Sort
            </button>
          }
        </div>

        <!-- Product Categories (matches video script: All, Headphones, Earphones, Speakers) -->
        <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 text-xs">
          @for (cat of productService.categories; track cat) {
            @if (productService.selectedCategory() === cat) {
              <!-- Active Category: Solid White Pill -->
              <button 
                type="button"
                (click)="productService.setCategory(cat)"
                class="px-5 py-2 rounded-full bg-white text-black font-extrabold whitespace-nowrap shadow-sm transition-all cursor-pointer">
                {{ cat }}
              </button>
            } @else {
              <!-- Inactive Category: Clean text link with hover feedback -->
              <button 
                type="button"
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
                type="button"
                (click)="resetFilters()" 
                class="mt-2 px-5 py-2 rounded-full bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition-colors cursor-pointer">
                Reset All Filters
              </button>
            </div>
          }
        </div>

      </div>

      <!-- Guaranteed-Visible Sort & Filter Drawer / Modal -->
      @if (showFilterModal()) {
        <div class="fixed inset-0 z-[9999] flex items-end justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
             style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9999;"
             (click)="closeFilterModal()">
          <div 
            class="w-full max-w-[430px] bg-[#1E1E22] rounded-t-[32px] p-6 space-y-5 border-t border-white/10 shadow-2xl pb-10"
            (click)="$event.stopPropagation()">
            
            <div class="w-10 h-1 rounded-full bg-white/20 mx-auto -mt-1"></div>

            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-base font-bold text-white">Sort & Filter</h3>
                <p class="text-[11px] text-[#7E7E88]">Arrange products according to your preference</p>
              </div>
              <button 
                type="button"
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
                  type="button"
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
                  type="button"
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
                  type="button"
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
                  type="button"
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
                type="button"
                (click)="closeFilterModal()"
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

  toggleFilterModal(e?: Event) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.showFilterModal.update(v => !v);
  }

  closeFilterModal() {
    this.showFilterModal.set(false);
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
