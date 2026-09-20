import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { AuthService, PaymentCard, ShippingAddress } from '../services/auth.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { IconComponent } from '../components/icon/icon.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, IconComponent],
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss']
})
export class CheckoutPage implements OnInit {
  cart = inject(CartService);
  orderService = inject(OrderService);
  auth = inject(AuthService);
  private router = inject(Router);

  selectedShipping: 'standard' | 'express' = 'standard';
  selectedPayment: 'apple_pay' | 'card' = 'apple_pay';
  isSubmitting = signal<boolean>(false);

  ngOnInit() {
    if (this.auth.isGuest()) {
      this.cart.showToast('Please sign in or create an account to checkout');
      this.router.navigate(['/login']);
    }
  }

  get defaultAddress(): ShippingAddress | undefined {
    return this.auth.shippingAddresses().find(a => a.isDefault) || this.auth.shippingAddresses()[0];
  }

  get defaultCard(): PaymentCard | undefined {
    return this.auth.paymentCards().find(c => c.isDefault) || this.auth.paymentCards()[0];
  }

  get shippingCost(): number {
    return this.selectedShipping === 'express' ? 15 : this.cart.deliveryFee();
  }

  get calculatedTotal(): number {
    return Math.max(0, this.cart.subtotal() - this.cart.discountAmount() + this.shippingCost);
  }

  openAddressEdit() {
    this.router.navigate(['/shipping-addresses']);
  }

  openPaymentEdit() {
    this.router.navigate(['/payment-methods']);
  }

  placeOrder() {
    if (this.auth.isGuest()) {
      this.cart.showToast('Guests cannot place orders. Please sign in.');
      this.router.navigate(['/login']);
      return;
    }

    if (this.cart.items().length === 0) return;

    this.isSubmitting.set(true);

    setTimeout(() => {
      const addr = this.defaultAddress;
      const shippingAddress = addr 
        ? `${addr.streetAddress}, ${addr.city}, ${addr.state} ${addr.postalCode}`
        : '742 Evergreen Terrace, Springfield, OR 97477';
      
      const paymentMethod = this.selectedPayment === 'apple_pay' 
        ? 'Apple Pay' 
        : `${this.defaultCard?.type || 'Card'} •••• ${this.defaultCard?.last4 || '4242'}`;

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
    }, 1000);
  }
}
