import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { IconComponent } from '../components/icon/icon.component';
import { CartService } from '../services/cart.service';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, ProductCardComponent, IconComponent],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);

  isLoading = signal<boolean>(true);
  showFilterModal = signal<boolean>(false);
  sortBy = signal<SortOption>('default');
  maxPrice = signal<number>(250);

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 600);
  }

  setCategory(cat: string) {
    if (this.productService.selectedCategory() !== cat) {
      this.productService.setCategory(cat);
      this.isLoading.set(true);
      setTimeout(() => {
        this.isLoading.set(false);
      }, 350);
    }
  }

  isSortActive(): boolean {
    return this.sortBy() !== 'default' || this.maxPrice() < 250;
  }

  toggleFilterModal(e?: Event) {
    if (e) {
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
      this.cartService.showToast(`Sorted: ${this.getSortLabel(option)}`);
    }
  }

  filteredProducts = computed(() => {
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
  });

  resetFilters() {
    this.productService.setCategory('All');
    this.productService.setSearchQuery('');
    this.sortBy.set('default');
    this.maxPrice.set(250);
    this.cartService.showToast('Filters reset to default');
  }
}
