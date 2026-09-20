import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product, ProductColor } from '../../models';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, IconComponent],
  template: `
    @if (product) {
      <div class="w-full min-h-screen bg-[#141416] text-white flex flex-col justify-between select-none animate-fade-in relative pb-28">
        
        <!-- Top Navbar with Details Title (matches cZDul4ky.jpg) -->
        <app-navbar 
          [title]="'Details'" 
          [showBack]="true"
          backUrl="/home">
        </app-navbar>

        <!-- Product Hero Showcase (matches cZDul4ky.jpg) -->
        <div class="relative w-full pt-4 pb-8 flex flex-col items-center justify-center">
          
          <!-- Radial Backdrop Spotlight for Headphone Hero -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div class="w-64 h-64 rounded-full bg-white/[0.04] blur-2xl"></div>
          </div>

          <!-- Headphone Image -->
          <div class="relative w-64 h-64 flex items-center justify-center z-10">
            <img 
              [src]="activeImage()" 
              [alt]="product.name" 
              class="max-w-[85%] max-h-[85%] object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] transition-all duration-300" />
          </div>

          <!-- Vertical Color Swatches on Right (matches cZDul4ky.jpg) -->
          <div class="absolute right-6 top-8 flex flex-col items-center gap-3.5 z-20">
            @for (color of product.colors; track color.name) {
              <button 
                (click)="selectColor(color)"
                [title]="color.name"
                class="group relative flex items-center justify-center p-1 rounded-full transition-transform active:scale-90"
                [ngClass]="selectedColor()?.name === color.name ? 'scale-110' : 'opacity-70 hover:opacity-100'">
                
                <!-- Ring for active -->
                <div 
                  class="w-6 h-6 rounded-full border-2 transition-all"
                  [ngClass]="selectedColor()?.name === color.name ? 'border-white ring-2 ring-white/30' : 'border-white/20'"
                  [style.backgroundColor]="color.hex">
                </div>

                <!-- Label tooltip -->
                <span class="absolute right-8 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {{ color.name }}
                </span>
              </button>
            }
          </div>

          <!-- Carousel Pagination Dots (matches cZDul4ky.jpg: [● ○ ○]) -->
          <div class="flex items-center gap-1.5 mt-4 z-10">
            <span class="w-6 h-1.5 rounded-full bg-white transition-all"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-white/30"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-white/30"></span>
          </div>

        </div>

        <!-- Details White Card Overlay (matches cZDul4ky.jpg sheet) -->
        <div class="w-full bg-white text-[#141416] rounded-t-[36px] p-6 pb-28 shadow-2xl space-y-5 animate-fade-in relative z-20">
          
          <!-- Top indicator bar -->
          <div class="w-10 h-1 bg-black/10 rounded-full mx-auto -mt-2"></div>

          <!-- Product Title & Tagline -->
          <div class="space-y-1.5">
            <div class="flex items-baseline gap-2">
              <span class="text-xl font-extrabold tracking-tight text-black font-sans">{{ product.brand }}</span>
              <span class="text-lg font-bold text-[#1C1C1E]">{{ product.name.replace(product.brand, '').trim() }}</span>
            </div>
            <p class="text-xs text-[#55555B] leading-relaxed font-normal">
              {{ product.description }}
            </p>
          </div>

          <!-- Feature Chips (matches cZDul4ky.jpg: Adaptive Noise Cancelling, Battery Life) -->
          <div class="space-y-2.5">
            @for (feat of product.features; track feat; let i = $index) {
              <div class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] text-xs font-medium text-[#1C1C1E]">
                <div class="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-xs">
                  @if (i === 0) {
                    <app-icon name="shield" [size]="13" color="#141416"></app-icon>
                  } @else if (i === 1) {
                    <app-icon name="check-circle" [size]="13" color="#141416"></app-icon>
                  } @else {
                    <app-icon name="star" [size]="13" color="#141416"></app-icon>
                  }
                </div>
                <span>{{ feat }}</span>
              </div>
            }
          </div>

          <!-- Audio Specs Mini Grid -->
          <div class="grid grid-cols-3 gap-2.5 pt-1">
            <div class="p-3 rounded-2xl bg-[#F5F5F7] text-center space-y-0.5">
              <p class="text-[10px] text-[#8E8E93] font-semibold uppercase">Driver</p>
              <p class="text-xs font-bold text-black">40mm</p>
            </div>
            <div class="p-3 rounded-2xl bg-[#F5F5F7] text-center space-y-0.5">
              <p class="text-[10px] text-[#8E8E93] font-semibold uppercase">Freq</p>
              <p class="text-xs font-bold text-black">16Hz - 20kHz</p>
            </div>
            <div class="p-3 rounded-2xl bg-[#F5F5F7] text-center space-y-0.5">
              <p class="text-[10px] text-[#8E8E93] font-semibold uppercase">Weight</p>
              <p class="text-xs font-bold text-black">265g</p>
            </div>
          </div>

        </div>

        <!-- Sticky Floating Bottom CTA Action Bar (matches cZDul4ky.jpg: dark container, $75, Buy Now) -->
        <div class="fixed bottom-4 left-0 right-0 max-w-[420px] mx-auto px-5 z-40 select-none">
          <div class="rounded-full bg-[#141416] p-2 pl-6 flex items-center justify-between shadow-2xl border border-white/10 backdrop-blur-xl">
            
            <!-- Price Display -->
            <div class="flex flex-col">
              <span class="text-xs text-white/50 font-medium">Total Price</span>
              <span class="text-xl font-black text-white tracking-tight">
                \${{ product.price }}
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2">
              <button 
                (click)="addToCart()"
                class="px-4 py-3 rounded-full bg-[#27272C] hover:bg-[#323238] text-white text-xs font-bold transition-all active:scale-95 border border-white/10 flex items-center gap-1.5">
                <app-icon name="cart" [size]="16" color="#FFFFFF"></app-icon>
                <span>Add</span>
              </button>

              <button 
                (click)="buyNow()"
                class="px-6 py-3 rounded-full bg-white text-black text-xs font-bold tracking-wide shadow-md hover:bg-neutral-200 active:scale-95 transition-all">
                Buy Now
              </button>
            </div>

          </div>
        </div>

      </div>
    } @else {
      <!-- Not Found Fallback -->
      <div class="w-full min-h-screen bg-[#141416] text-white p-6 flex flex-col items-center justify-center space-y-4">
        <p class="text-base font-bold">Product not found</p>
        <button (click)="goHome()" class="px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold">
          Back to Home
        </button>
      </div>
    }
  `
})
export class ProductDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  product?: Product;
  selectedColor = signal<ProductColor | null>(null);
  activeImage = signal<string>('');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || 'jbl-live-660nc';
      this.product = this.productService.getProductById(id) || this.productService.products()[0];
      if (this.product) {
        this.selectedColor.set(this.product.colors[0]);
        this.activeImage.set(this.product.images[0]);
      }
    });
  }

  selectColor(color: ProductColor) {
    this.selectedColor.set(color);
  }

  addToCart() {
    if (this.product) {
      this.cartService.addItem(this.product, this.selectedColor() || undefined, 1);
    }
  }

  buyNow() {
    if (this.product) {
      this.cartService.addItem(this.product, this.selectedColor() || undefined, 1);
      this.router.navigate(['/cart']);
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
