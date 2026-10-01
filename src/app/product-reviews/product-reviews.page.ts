import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ReviewService } from '../services/review.service';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Product, Review } from '../models';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { IconComponent } from '../components/icon/icon.component';

@Component({
  selector: 'app-product-reviews-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, IconComponent],
  templateUrl: './product-reviews.page.html',
  styleUrls: ['./product-reviews.page.scss']
})
export class ProductReviewsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  productService = inject(ProductService);
  reviewService = inject(ReviewService);
  auth = inject(AuthService);
  private cartService = inject(CartService);

  productId = signal<string>('');
  product = signal<Product | null>(null);
  selectedStarFilter = signal<number | 'all'>('all');
  isLoading = signal<boolean>(true);

  showWriteReviewModal = signal<boolean>(false);
  modalRating = signal<number>(0);
  modalComment = signal<string>('');
  modalRatingError = signal<string>('');

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.isLoading.set(true);
      const id = params.get('id') || 'jbl-live-660nc';
      this.productId.set(id);
      const found = this.productService.getProductById(id) || this.productService.products()[0];
      this.product.set(found || null);
      setTimeout(() => {
        this.isLoading.set(false);
      }, 350);
    });
  }

  get starBreakdown() {
    const pId = this.productId();
    const counts = this.reviewService.getStarCounts(pId);
    const total = this.reviewService.getReviewsByProduct(pId).length || 1;
    return [5, 4, 3, 2, 1].map(star => ({
      star,
      count: counts[star] || 0,
      pct: Math.round(((counts[star] || 0) / total) * 100)
    }));
  }

  get filteredReviews(): Review[] {
    const pId = this.productId();
    const all = this.reviewService.getReviewsByProduct(pId);
    const filter = this.selectedStarFilter();
    if (filter === 'all') {
      return all;
    }
    return all.filter(r => r.rating === filter);
  }

  get totalReviewsCount(): number {
    return this.reviewService.getReviewsByProduct(this.productId()).length;
  }

  get ratingSummary(): { average: number; count: number } {
    return this.reviewService.getAverageRating(this.productId());
  }

  getStarCount(star: number): number {
    return this.reviewService.getStarCounts(this.productId())[star] || 0;
  }

  selectFilter(star: number | 'all') {
    this.selectedStarFilter.set(star);
  }

  openWriteModal() {
    this.modalRating.set(0);
    this.modalComment.set('');
    this.modalRatingError.set('');
    this.showWriteReviewModal.set(true);
  }

  selectModalStar(star: number) {
    this.modalRating.set(star);
    this.modalRatingError.set('');
  }

  submitModalReview() {
    if (this.modalRating() <= 0) {
      this.modalRatingError.set('Star rating is required. Please select 1 to 5 stars.');
      return;
    }

    const p = this.product();
    if (!p) return;

    this.reviewService.addReview({
      productId: p.id,
      authorName: this.auth.currentUser()?.name || 'Verified Buyer',
      rating: this.modalRating(),
      comment: this.modalComment() || 'Great sound and performance!'
    });

    this.cartService.showToast('Thank you! Your review has been added.');
    this.showWriteReviewModal.set(false);
  }

  goBack() {
    const p = this.product();
    if (p) {
      this.router.navigate(['/product', p.id]);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
