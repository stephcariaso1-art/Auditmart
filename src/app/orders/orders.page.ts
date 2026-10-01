import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { IconComponent } from '../components/icon/icon.component';
import { Order } from '../models';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, IconComponent],
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss']
})
export class OrdersPage implements OnInit {
  orderService = inject(OrderService);
  auth = inject(AuthService);
  private cartService = inject(CartService);
  private reviewService = inject(ReviewService);
  private router = inject(Router);

  isLoading = signal<boolean>(true);
  activeTrackOrder = signal<Order | null>(null);
  activeReviewOrder = signal<Order | null>(null);
  selectedRating = signal<number>(0);
  reviewComment = signal<string>('');
  ratingError = signal<string>('');
  reviewedOrderIds = signal<string[]>([]);

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 450);
  }

  openReviewModal(order: Order) {
    this.activeReviewOrder.set(order);
    this.selectedRating.set(0);
    this.reviewComment.set('');
    this.ratingError.set('');
  }

  selectStar(stars: number) {
    this.selectedRating.set(stars);
    this.ratingError.set('');
  }

  submitReview() {
    if (this.selectedRating() <= 0) {
      this.ratingError.set('Star rating is required. Please choose 1 to 5 stars.');
      return;
    }

    const order = this.activeReviewOrder();
    if (!order || !order.items.length) return;

    const product = order.items[0].product;
    this.reviewService.addReview({
      productId: product.id,
      authorName: this.auth.currentUser()?.name || 'Verified Buyer',
      rating: this.selectedRating(),
      comment: this.reviewComment() || 'Great audio product, completely satisfied with this purchase!'
    });

    this.reviewedOrderIds.update(ids => [...ids, order.id]);
    this.cartService.showToast('Thank you! Your review has been submitted.');
    this.activeReviewOrder.set(null);
  }


  openTrackingModal(order: Order) {
    this.activeTrackOrder.set(order);
  }

  viewReceipt(order: Order) {
    this.orderService.latestOrder.set(order);
    this.router.navigate(['/receipt']);
  }

  reorder(order: Order) {
    if (this.auth.isGuest()) {
      this.cartService.showToast('Please sign in to reorder items');
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.clearCart();
    for (const item of order.items) {
      this.cartService.addItem(item.product, item.selectedColor, item.quantity);
    }
    this.cartService.showToast(`Reordering ${order.items[0].product.name}...`);
    this.router.navigate(['/checkout']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }
}
