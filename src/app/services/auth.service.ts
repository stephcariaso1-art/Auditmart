import { Injectable, signal } from '@angular/core';
import { UserProfile } from '../models';

export interface PaymentCard {
  id: string;
  type: string;
  cardholderName?: string;
  last4: string;
  exp: string;
  isDefault: boolean;
}

export interface ShippingAddress {
  id: string;
  label: string;
  recipientName: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly isGuest = signal<boolean>(false);

  readonly currentUser = signal<UserProfile | null>({
    name: 'Alex Rivera',
    email: 'alex.rivera@audiomart.io',
    phone: '+1 (555) 234-8921',
    address: '742 Evergreen Terrace, Springfield, OR 97477',
    avatar: 'assets/avatar.jpg',
    memberTier: 'Audiophile VIP Club'
  });

  readonly paymentCards = signal<PaymentCard[]>([
    { id: 'c1', type: 'Mastercard', cardholderName: 'Alex Rivera', last4: '4242', exp: '12/28', isDefault: true },
    { id: 'c2', type: 'Visa', cardholderName: 'Alex Rivera', last4: '8819', exp: '09/27', isDefault: false }
  ]);

  readonly shippingAddresses = signal<ShippingAddress[]>([
    {
      id: 'addr-1',
      label: 'Home',
      recipientName: 'Alex Rivera',
      streetAddress: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      postalCode: '97477',
      phone: '+1 (555) 234-8921',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Studio & Office',
      recipientName: 'Alex Rivera',
      streetAddress: '100 Soundview Blvd, Suite 400',
      city: 'Portland',
      state: 'OR',
      postalCode: '97201',
      phone: '+1 (555) 234-8921',
      isDefault: false
    }
  ]);

  readonly isAuthenticated = signal<boolean>(true);

  setGuestMode(asGuest: boolean) {
    this.isGuest.set(asGuest);
    if (asGuest) {
      this.isAuthenticated.set(false);
      this.currentUser.set(null);
    } else {
      this.login('alex.rivera@audiomart.io', '');
    }
  }

  login(email: string, password: string): boolean {
    if (email) {
      this.currentUser.set({
        name: email.split('@')[0] || 'Audiophile Member',
        email: email,
        phone: '+1 (555) 019-2831',
        address: '742 Evergreen Terrace, Springfield, OR 97477',
        avatar: 'assets/avatar.jpg',
        memberTier: 'Gold Member'
      });
      this.isGuest.set(false);
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  signup(name: string, email: string, password: string): boolean {
    if (name && email) {
      this.currentUser.set({
        name,
        email,
        phone: '+1 (555) 000-0000',
        address: '742 Evergreen Terrace, Springfield, OR 97477',
        avatar: 'assets/avatar.jpg',
        memberTier: 'New Member'
      });
      this.isGuest.set(false);
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  updateProfile(name: string, email: string, phone: string) {
    const current = this.currentUser();
    if (current) {
      this.currentUser.set({
        ...current,
        name,
        email,
        phone
      });
    }
  }

  updateAddress(address: string) {
    const current = this.currentUser();
    if (current) {
      this.currentUser.set({
        ...current,
        address
      });
    }
  }

  addPaymentCard(type: string, last4: string, exp: string, cardholderName: string = 'Alex Rivera', isDefault: boolean = false) {
    const shouldBeDefault = isDefault || this.paymentCards().length === 0;
    const newCard: PaymentCard = {
      id: `c-${Date.now()}`,
      type,
      cardholderName,
      last4,
      exp,
      isDefault: shouldBeDefault
    };
    if (shouldBeDefault) {
      this.paymentCards.update(cards => cards.map(c => ({ ...c, isDefault: false })));
    }
    this.paymentCards.update(cards => [...cards, newCard]);
  }

  deletePaymentCard(id: string) {
    this.paymentCards.update(cards => cards.filter(c => c.id !== id));
  }

  setDefaultCard(id: string) {
    this.paymentCards.update(cards =>
      cards.map(c => ({ ...c, isDefault: c.id === id }))
    );
  }

  addShippingAddress(addr: Omit<ShippingAddress, 'id'>) {
    const newAddress: ShippingAddress = {
      ...addr,
      id: `addr-${Date.now()}`
    };
    if (newAddress.isDefault) {
      this.shippingAddresses.update(list =>
        list.map(a => ({ ...a, isDefault: false }))
      );
    }
    this.shippingAddresses.update(list => [...list, newAddress]);

    if (newAddress.isDefault) {
      const formatted = `${newAddress.streetAddress}, ${newAddress.city}, ${newAddress.state} ${newAddress.postalCode}`;
      this.updateAddress(formatted);
    }
  }

  deleteShippingAddress(id: string) {
    this.shippingAddresses.update(list => list.filter(a => a.id !== id));
  }

  setDefaultAddress(id: string) {
    this.shippingAddresses.update(list =>
      list.map(a => {
        const isDef = a.id === id;
        if (isDef) {
          const formatted = `${a.streetAddress}, ${a.city}, ${a.state} ${a.postalCode}`;
          this.updateAddress(formatted);
        }
        return { ...a, isDefault: isDef };
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.isGuest.set(false);
  }
}
