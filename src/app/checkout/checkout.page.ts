import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { IconComponent } from '../components/icon/icon.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, IconComponent],
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss']
})
export class CheckoutPage {
  cart = inject(CartService);
  orderService = inject(OrderService);
  auth = inject(AuthService);
  private router = inject(Router);

  selectedShipping: 'standard' | 'express' = 'standard';
  selectedPayment: 'apple_pay' | 'card' = 'apple_pay';
  isSubmitting = signal<boolean>(false);

  get shippingCost(): number {
    return this.selectedShipping === 'express' ? 15 : this.cart.deliveryFee();
  }

  get calculatedTotal(): number {
    return Math.max(0, this.cart.subtotal() - this.cart.discountAmount() + this.shippingCost);
  }

  openAddressEdit() {
    this.router.navigate(['/profile']);
  }

  placeOrder() {
    if (this.cart.items().length === 0) return;

    this.isSubmitting.set(true);

    setTimeout(() => {
      const shippingAddress = this.auth.currentUser()?.address || '742 Evergreen Terrace, Springfield, OR';
      const paymentMethod = this.selectedPayment === 'apple_pay' ? 'Apple Pay' : 'Mastercard •••• 4242';

      this.orderService.createOrder(
        this.cart.items(),
        this.cart.subtotal(),
        this.cart.discountAmount(),
        this.shippingCost,
        this.calculatedTotal,
        shippingAddress,
        paymentMethod
      );

      this.cart.clearCart();
      this.isSubmitting.set(false);
      this.router.navigate(['/receipt']);
    }, 1200);
  }
}
