import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, PaymentCard } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ThemeService } from '../services/theme.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { IconComponent } from '../components/icon/icon.component';

@Component({
  selector: 'app-payment-methods-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, IconComponent],
  templateUrl: './payment-methods.page.html',
  styleUrls: ['./payment-methods.page.scss']
})
export class PaymentMethodsPage {
  auth = inject(AuthService);
  themeService = inject(ThemeService);
  private cartService = inject(CartService);
  private router = inject(Router);

  showAddModal = signal<boolean>(false);

  get defaultCard(): PaymentCard | undefined {
    return this.auth.paymentCards().find(c => c.isDefault) || this.auth.paymentCards()[0];
  }

  cardholderName = 'Alex Rivera';
  cardType: 'Mastercard' | 'Visa' | 'Amex' = 'Mastercard';
  cardNumber = '';
  expiryDate = '';
  cvv = '';
  setAsDefault = false;
  errorMessage = signal<string>('');

  openAddModal() {
    this.cardholderName = this.auth.currentUser()?.name || 'Alex Rivera';
    this.cardType = 'Mastercard';
    this.cardNumber = '';
    this.expiryDate = '';
    this.cvv = '';
    this.setAsDefault = this.auth.paymentCards().length === 0;
    this.errorMessage.set('');
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
  }

  saveCard() {
    const rawNumber = this.cardNumber.replace(/\s+/g, '');
    if (!rawNumber || rawNumber.length < 12) {
      this.errorMessage.set('Please enter a valid card number');
      return;
    }
    if (!this.expiryDate || !this.expiryDate.includes('/')) {
      this.errorMessage.set('Please enter expiry as MM/YY');
      return;
    }
    if (!this.cvv || this.cvv.length < 3) {
      this.errorMessage.set('Please enter a valid 3-digit CVV');
      return;
    }

    const last4 = rawNumber.slice(-4);
    this.auth.addPaymentCard(this.cardType, last4, this.expiryDate, this.cardholderName, this.setAsDefault);

    this.cartService.showToast(`${this.cardType} ending in ${last4} added`);
    this.closeAddModal();
  }

  setDefault(card: PaymentCard) {
    this.auth.setDefaultCard(card.id);
    this.cartService.showToast(`${card.type} set as default payment`);
  }

  deleteCard(card: PaymentCard) {
    this.auth.deletePaymentCard(card.id);
    this.cartService.showToast(`Card removed`);
  }

  formatCardNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    let val = input.value.replace(/\D/g, '').substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    this.cardNumber = formatted;
  }

  formatExpiry(event: Event) {
    const input = event.target as HTMLInputElement;
    let val = input.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 2) {
      this.expiryDate = val.substring(0, 2) + '/' + val.substring(2);
    } else {
      this.expiryDate = val;
    }
  }
}
