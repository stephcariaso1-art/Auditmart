import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';
import { ThemeService } from '../services/theme.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { IconComponent } from '../components/icon/icon.component';
import { Order } from '../models';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, IconComponent],
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss']
})
export class OrdersPage implements OnInit {
  orderService = inject(OrderService);
  auth = inject(AuthService);
  themeService = inject(ThemeService);
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
  mapZoomLevel = signal<number>(1);
  driverPos = signal<{ x: number; y: number; etaMin: number; kmLeft: number }>({
    x: 210,
    y: 115,
    etaMin: 8,
    kmLeft: 2.3
  });

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
    this.mapZoomLevel.set(1);
    if (order.status === 'Delivered') {
      this.driverPos.set({ x: 295, y: 70, etaMin: 0, kmLeft: 0 });
    } else if (order.status === 'Processing') {
      this.driverPos.set({ x: 50, y: 180, etaMin: 35, kmLeft: 8.5 });
    } else {
      this.driverPos.set({ x: 210, y: 115, etaMin: 8, kmLeft: 2.3 });
    }
  }

  zoomIn() {
    this.mapZoomLevel.update(z => Math.min(1.4, Number((z + 0.15).toFixed(2))));
  }

  zoomOut() {
    this.mapZoomLevel.update(z => Math.max(0.85, Number((z - 0.15).toFixed(2))));
  }

  resetZoom() {
    this.mapZoomLevel.set(1);
  }

  refreshGPS() {
    const order = this.activeTrackOrder();
    if (order?.status === 'Delivered') {
      this.cartService.showToast('Order delivered. Driver completed this route.');
      return;
    }
    this.driverPos.update(pos => {
      const nextX = Math.min(270, pos.x + 12);
      const nextY = Math.max(80, pos.y - 6);
      const nextEta = Math.max(2, pos.etaMin - 1);
      const nextKm = Math.max(0.6, Number((pos.kmLeft - 0.4).toFixed(1)));
      return { x: nextX, y: nextY, etaMin: nextEta, kmLeft: nextKm };
    });
    this.cartService.showToast(`GPS Refreshed: Driver moving along Ayala Ave (ETA: ${this.driverPos().etaMin} mins)`);
  }

  callCourier() {
    this.cartService.showToast('Calling audiMart Courier (+63 917 552 4819)...');
  }

  messageCourier() {
    this.cartService.showToast('Opening live chat with delivery driver...');
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
