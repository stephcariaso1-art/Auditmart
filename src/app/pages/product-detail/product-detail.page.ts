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
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss']
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

  getModel(product: Product): string {
    return product.name.replace(product.brand, '').trim();
  }

  selectColor(color: ProductColor) {
    this.selectedColor.set(color);
  }

  addToCart() {
    if (this.product) {
      this.cartService.addItem(this.product, this.selectedColor() || undefined, 1);
      this.router.navigate(['/cart']);
    }
  }

  buyNow() {
    if (this.product) {
      this.cartService.addItem(this.product, this.selectedColor() || undefined, 1);
      this.router.navigate(['/checkout']);
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
