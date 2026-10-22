import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';
import { ThemeService } from '../services/theme.service';
import { Product, ProductColor, Review } from '../models';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { IconComponent } from '../components/icon/icon.component';

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
  private reviewService = inject(ReviewService);
  themeService = inject(ThemeService);
  auth = inject(AuthService);

  product?: Product;
  isLoading = signal<boolean>(true);
  selectedColor = signal<ProductColor | null>(null);
  activeImage = signal<string>('');
  showGuestAuthModal = signal<boolean>(false);
  activeImageIndex = signal<number>(0);

  private touchStartX = 0;
  private touchStartY = 0;
  private touchEndX = 0;
  private isPointerDown = false;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.isLoading.set(true);
      const id = params.get('id') || 'jbl-live-660nc';
      this.product = this.productService.getProductById(id) || this.productService.products()[0];
      if (this.product) {
        this.selectedColor.set(this.product.colors[0]);
        this.activeImageIndex.set(0);
        this.activeImage.set(this.product.images[0]);
      }
      setTimeout(() => {
        this.isLoading.set(false);
      }, 450);
    });
  }

  getModel(product: Product): string {
    return product.name.replace(product.brand, '').trim();
  }

  topReviews(): Review[] {
    if (!this.product) return [];
    return this.reviewService.getTopReviews(this.product.id, 3);
  }

  totalReviewsCount(): number {
    if (!this.product) return 0;
    return this.reviewService.getReviewsByProduct(this.product.id).length;
  }

  ratingSummary(): { average: number; count: number } {
    if (!this.product) return { average: 5.0, count: 0 };
    return this.reviewService.getAverageRating(this.product.id);
  }

  goToAllReviews() {
    if (this.product) {
      this.router.navigate(['/product', this.product.id, 'reviews']);
    }
  }


  setImageIndex(idx: number) {
    if (!this.product || !this.product.images.length) return;
    const bounded = (idx + this.product.images.length) % this.product.images.length;
    this.activeImageIndex.set(bounded);
    this.activeImage.set(this.product.images[bounded]);

    if (this.product.colors && this.product.colors[bounded]) {
      this.selectedColor.set(this.product.colors[bounded]);
    }
  }

  prevImage() {
    this.setImageIndex(this.activeImageIndex() - 1);
  }

  nextImage() {
    this.setImageIndex(this.activeImageIndex() + 1);
  }

  onTouchStart(e: TouchEvent) {
    if (e.touches.length > 0) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.touchEndX = this.touchStartX;
    }
  }

  onTouchMove(e: TouchEvent) {
    if (e.touches.length > 0) {
      this.touchEndX = e.touches[0].clientX;
    }
  }

  onTouchEnd(e: TouchEvent) {
    const deltaX = this.touchEndX - this.touchStartX;
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        this.nextImage();
      } else {
        this.prevImage();
      }
    }
  }

  onPointerDown(e: PointerEvent) {
    this.isPointerDown = true;
    this.touchStartX = e.clientX;
    this.touchEndX = e.clientX;
  }

  onPointerMove(e: PointerEvent) {
    if (this.isPointerDown) {
      this.touchEndX = e.clientX;
    }
  }

  onPointerUp(e: PointerEvent) {
    if (!this.isPointerDown) return;
    this.isPointerDown = false;
    const deltaX = this.touchEndX - this.touchStartX;
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        this.nextImage();
      } else {
        this.prevImage();
      }
    }
  }

  onPointerCancel(e: PointerEvent) {
    this.isPointerDown = false;
  }

  selectColor(color: ProductColor) {
    this.selectedColor.set(color);
    if (this.product && this.product.images.length > 1) {
      const idx = this.product.colors.findIndex(c => c.name === color.name);
      if (idx !== -1 && idx < this.product.images.length) {
        this.activeImageIndex.set(idx);
        this.activeImage.set(this.product.images[idx]);
      } else {
        this.activeImageIndex.set(0);
        this.activeImage.set(this.product.images[0]);
      }
    }
  }

  addToCart() {
    if (this.auth.isGuest()) {
      this.showGuestAuthModal.set(true);
      return;
    }
    if (this.product) {
      this.cartService.addItem(this.product, this.selectedColor() || undefined, 1);
      this.router.navigate(['/cart']);
    }
  }

  buyNow() {
    if (this.auth.isGuest()) {
      this.showGuestAuthModal.set(true);
      return;
    }
    if (this.product) {
      this.cartService.addItem(this.product, this.selectedColor() || undefined, 1);
      this.router.navigate(['/checkout']);
    }
  }

  goToLogin() {
    this.showGuestAuthModal.set(false);
    this.router.navigate(['/login']);
  }

  goToSignUp() {
    this.showGuestAuthModal.set(false);
    this.router.navigate(['/signup']);
  }

  getProductSpecs(): { label: string; value: string }[] {
    if (!this.product) return [];
    if (this.product.category === 'Microphones') {
      return [
        { label: 'Pattern', value: 'Cardioid' },
        { label: 'Freq Range', value: '20Hz-20kHz' },
        { label: 'Interface', value: this.product.id.includes('yeti') ? 'USB-C 24b' : 'Studio XLR' }
      ];
    }
    if (this.product.category === 'Speakers') {
      return [
        { label: 'Acoustics', value: '30W Peak' },
        { label: 'Battery', value: '12 Hours' },
        { label: 'Ingress', value: 'IP67 Water' }
      ];
    }
    if (this.product.category === 'Earphones') {
      return [
        { label: 'Driver', value: '11mm Liquid' },
        { label: 'Battery', value: '28h w/ Case' },
        { label: 'Latency', value: 'Ultra-Low' }
      ];
    }
    return [
      { label: 'Driver', value: '45mm Dome' },
      { label: 'Freq Range', value: '16Hz-20kHz' },
      { label: 'Weight', value: '265g' }
    ];
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
