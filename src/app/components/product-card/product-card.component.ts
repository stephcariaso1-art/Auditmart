import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `],
  template: `
    <div 
      [routerLink]="['/product', product.id]"
      class="group relative w-full h-[140px] bg-[#222226] hover:bg-[#28282D] active:scale-[0.985] rounded-[28px] px-5 py-4 flex items-center justify-between border border-white/[0.06] transition-all duration-200 cursor-pointer overflow-hidden shadow-md select-none">
      
      <!-- Left Info (matches typography in xwCBv8L_.jpg) -->
      <div class="flex flex-col justify-between h-full z-10 max-w-[62%] py-0.5">
        <div>
          <h3 class="tracking-tight leading-snug flex items-baseline gap-1.5 flex-wrap">
            <span class="text-[15px] font-black text-white">{{ product.brand }}</span>
            <span class="text-[14px] font-medium text-white/90">{{ getModel(product) }}</span>
          </h3>
          <p class="text-[11px] text-[#8E8E93] mt-1 font-medium line-clamp-1">
            {{ product.subtitle }}
          </p>
        </div>

        <!-- Price Badge (matches dark pill in xwCBv8L_.jpg) -->
        <div class="pt-2">
          <span class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#34343A] text-white text-xs font-bold tracking-wide border border-white/5 group-hover:bg-white group-hover:text-black transition-colors shadow-xs">
            \${{ product.price }}
          </span>
        </div>
      </div>

      <!-- Right Headphone Image (matches xwCBv8L_.jpg) -->
      <div class="relative w-[115px] h-[115px] flex items-center justify-center flex-shrink-0 -mr-1">
        <img 
          [src]="product.images[0]" 
          [alt]="product.name" 
          class="max-w-full max-h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy" />
      </div>

    </div>
  `
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  getModel(product: Product): string {
    if (!product) return '';
    return product.name.replace(product.brand, '').trim();
  }
}
