import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ShippingAddress } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ThemeService } from '../services/theme.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { IconComponent } from '../components/icon/icon.component';

@Component({
  selector: 'app-shipping-addresses-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, IconComponent],
  templateUrl: './shipping-addresses.page.html',
  styleUrls: ['./shipping-addresses.page.scss']
})
export class ShippingAddressesPage {
  auth = inject(AuthService);
  themeService = inject(ThemeService);
  private cartService = inject(CartService);
  private router = inject(Router);

  showAddModal = signal<boolean>(false);

  label: 'Home' | 'Office' | 'Studio' | 'Other' = 'Home';
  recipientName = 'Alex Rivera';
  streetAddress = '';
  city = '';
  state = '';
  postalCode = '';
  phone = '+1 (555) 234-8921';
  setAsDefault = false;
  errorMessage = signal<string>('');

  openAddModal() {
    this.label = 'Home';
    this.recipientName = this.auth.currentUser()?.name || 'Alex Rivera';
    this.streetAddress = '';
    this.city = '';
    this.state = '';
    this.postalCode = '';
    this.phone = this.auth.currentUser()?.phone || '+1 (555) 234-8921';
    this.setAsDefault = this.auth.shippingAddresses().length === 0;
    this.errorMessage.set('');
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
  }

  saveAddress() {
    if (!this.recipientName.trim()) {
      this.errorMessage.set('Please enter a recipient name');
      return;
    }
    if (!this.streetAddress.trim()) {
      this.errorMessage.set('Please enter a street address');
      return;
    }
    if (!this.city.trim() || !this.state.trim() || !this.postalCode.trim()) {
      this.errorMessage.set('Please enter city, state, and postal code');
      return;
    }

    this.auth.addShippingAddress({
      label: this.label,
      recipientName: this.recipientName.trim(),
      streetAddress: this.streetAddress.trim(),
      city: this.city.trim(),
      state: this.state.trim(),
      postalCode: this.postalCode.trim(),
      phone: this.phone.trim(),
      isDefault: this.setAsDefault
    });

    this.cartService.showToast(`Address "${this.label}" added`);
    this.closeAddModal();
  }

  setDefault(address: ShippingAddress) {
    this.auth.setDefaultAddress(address.id);
    this.cartService.showToast(`${address.label} set as default shipping address`);
  }

  deleteAddress(address: ShippingAddress) {
    this.auth.deleteShippingAddress(address.id);
    this.cartService.showToast(`Address removed`);
  }
}
