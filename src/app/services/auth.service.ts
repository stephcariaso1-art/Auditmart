import { Injectable, signal } from '@angular/core';
import { UserProfile } from '../models';

export interface PaymentCard {
  id: string;
  type: string;
  last4: string;
  exp: string;
  isDefault: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly currentUser = signal<UserProfile | null>({
    name: 'Alex Rivera',
    email: 'alex.rivera@audiomart.io',
    phone: '+1 (555) 234-8921',
    address: '742 Evergreen Terrace, Springfield, OR 97477',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    memberTier: 'Audiophile VIP Club'
  });

  readonly paymentCards = signal<PaymentCard[]>([
    { id: 'c1', type: 'Mastercard', last4: '4242', exp: '12/28', isDefault: true },
    { id: 'c2', type: 'Visa', last4: '8819', exp: '09/27', isDefault: false }
  ]);

  readonly isAuthenticated = signal<boolean>(true);

  login(email: string, password: string): boolean {
    if (email) {
      this.currentUser.set({
        name: email.split('@')[0] || 'Audiophile Member',
        email: email,
        phone: '+1 (555) 019-2831',
        address: '742 Evergreen Terrace, Springfield, OR 97477',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        memberTier: 'Gold Member'
      });
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
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        memberTier: 'New Member'
      });
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

  addPaymentCard(type: string, last4: string, exp: string) {
    const newCard: PaymentCard = {
      id: `c-${Date.now()}`,
      type,
      last4,
      exp,
      isDefault: false
    };
    this.paymentCards.update(cards => [...cards, newCard]);
  }

  setDefaultCard(id: string) {
    this.paymentCards.update(cards =>
      cards.map(c => ({ ...c, isDefault: c.id === id }))
    );
  }

  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }
}
