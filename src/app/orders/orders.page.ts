import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
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
export class OrdersPage {
  orderService = inject(OrderService);
  auth = inject(AuthService);
  private cartService = inject(CartService);
  private router = inject(Router);

  activeTrackOrder = signal<Order | null>(null);

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
