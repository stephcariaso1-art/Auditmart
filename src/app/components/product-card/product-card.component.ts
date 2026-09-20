import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div 
      [routerLink]="['/product', product.id]"
      class="group relative w-full h-[130px] bg-[#222226] hover:bg-[#28282D] active:scale-[0.985] rounded-[24px] px-5 py-4 flex items-center justify-between border border-white/[0.05] transition-all duration-200 cursor-pointer overflow-hidden shadow-lg select-none">
      
      <!-- Left Info (matches xwCBv8L_.jpg) -->
      <div class="flex flex-col justify-between h-full z-10 max-w-[62%]">
        <div>
          <h3 class="text-[15px] font-bold text-white tracking-tight leading-snug">
            {{ product.name }}
          </h3>
          <p class="text-[11px] text-[#7E7E88] mt-1 font-medium line-clamp-1">
            {{ product.subtitle }}
          </p>
        </div>

        <!-- Price Badge (matches dark pill $75 in xwCBv8L_.jpg) -->
        <div>
          <span class="inline-flex items-center justify-center px-4 py-1 rounded-full bg-[#34343A] text-white text-xs font-bold tracking-wide border border-white/5">
            \${{ product.price }}
          </span>
        </div>
      </div>

      <!-- Right Headphone Image (matches xwCBv8L_.jpg) -->
      <div class="relative w-[115px] h-[115px] flex items-center justify-center flex-shrink-0 -mr-1">
        <img 
          [src]="product.images[0]" 
          [alt]="product.name" 
          class="max-w-full max-h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy" />
      </div>

    </div>
  `
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}
