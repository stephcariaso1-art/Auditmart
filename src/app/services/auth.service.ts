import { Injectable, signal } from '@angular/core';
import { UserProfile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly currentUser = signal<UserProfile | null>({
    name: 'Alex Rivera',
    email: 'alex.rivera@audiomart.io',
    phone: '+1 (555) 234-8921',
    address: '742 Evergreen Terrace, Springfield, OR',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    memberTier: 'Audiophile VIP Club'
  });

  readonly isAuthenticated = signal<boolean>(true);

  login(email: string, password: string): boolean {
    if (email) {
      this.currentUser.set({
        name: email.split('@')[0] || 'Audiophile Member',
        email: email,
        phone: '+1 (555) 019-2831',
        address: 'Downtown Studio 4B, Seattle, WA',
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
        address: 'Select delivery address',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
        memberTier: 'New Member'
      });
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }
}
