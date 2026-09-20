import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Order } from '../../models';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss']
})
export class OrdersPage {
  orderService = inject(OrderService);
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
    this.cartService.clearCart();
    for (const item of order.items) {
      this.cartService.addItem(item.product, item.selectedColor, item.quantity);
    }
    this.cartService.showToast(`Reordering ${order.items[0].product.name}...`);
    this.router.navigate(['/checkout']);
  }
}
