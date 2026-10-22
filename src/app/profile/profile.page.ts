import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ThemeService } from '../services/theme.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { IconComponent } from '../components/icon/icon.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  auth = inject(AuthService);
  themeService = inject(ThemeService);
  private cart = inject(CartService);
  private router = inject(Router);

  user = this.auth.currentUser;

  firstName = 'Alex';
  lastName = 'Rivera';
  email = 'alex.rivera@audiomart.io';
  cpNumber = '+1 (555) 234-8921';
  editAddress = '742 Evergreen Terrace, Springfield, OR 97477';

  ngOnInit() {
    const u = this.user();
    if (u) {
      const parts = (u.name || 'Alex Rivera').split(' ');
      this.firstName = parts[0] || 'Alex';
      this.lastName = parts.slice(1).join(' ') || 'Rivera';
      this.email = u.email || 'alex.rivera@audiomart.io';
      this.cpNumber = u.phone || '+1 (555) 234-8921';
      this.editAddress = u.address || '742 Evergreen Terrace, Springfield, OR 97477';
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  saveProfile() {
    const fullName = `${this.firstName.trim()} ${this.lastName.trim()}`.trim();
    this.auth.updateProfile(fullName, this.email.trim(), this.cpNumber.trim());
    this.cart.showToast('Profile saved successfully');
  }

  changeAvatarPrompt() {
    this.cart.showToast('Avatar updated');
  }

  navigateToShipping() {
    this.router.navigate(['/shipping-addresses']);
  }

  navigateToPayment() {
    this.router.navigate(['/payment-methods']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
    this.cart.showToast('Logged out successfully');
    this.router.navigate(['/login']);
  }
}
