import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div 
      [routerLink]="['/product', product.id]"
      class="group relative w-full h-[155px] bg-[#232328] hover:bg-[#2A2A30] active:scale-[0.985] rounded-[26px] p-5 flex items-center justify-between border border-white/[0.06] transition-all duration-200 cursor-pointer overflow-hidden shadow-card">
      
      <!-- Left Info -->
      <div class="flex flex-col justify-between h-full z-10 max-w-[62%]">
        <div>
          <h3 class="text-base font-bold text-white tracking-tight group-hover:text-white/95 leading-snug">
            {{ product.name }}
          </h3>
          <p class="text-xs text-[#8E8E93] mt-1 font-medium line-clamp-1">
            {{ product.subtitle }}
          </p>
        </div>

        <!-- Price Badge -->
        <div class="pt-2">
          <span class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#323238] text-white text-xs font-bold tracking-wide border border-white/10 group-hover:bg-white group-hover:text-black transition-colors">
            \${{ product.price }}
          </span>
        </div>
      </div>

      <!-- Right Image Cutout -->
      <div class="relative w-[130px] h-[130px] flex items-center justify-center -mr-2 select-none">
        <!-- Subtle Glow Behind Image -->
        <div class="absolute inset-0 bg-white/[0.03] rounded-full filter blur-xl group-hover:bg-white/[0.08] transition-all"></div>
        
        <img 
          [src]="product.images[1] || product.images[0]" 
          [alt]="product.name" 
          class="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy" />
      </div>

    </div>
  `
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}
