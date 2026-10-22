import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { IconComponent } from '../components/icon/icon.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, IconComponent],
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage implements OnInit {
  cart = inject(CartService);
  auth = inject(AuthService);
  themeService = inject(ThemeService);
  private router = inject(Router);

  isLoading = signal<boolean>(true);
  showGuestAuthModal = signal<boolean>(false);

  ngOnInit() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 400);
  }

  proceedToCheckout() {
    if (this.auth.isGuest()) {
      this.showGuestAuthModal.set(true);
      return;
    }
    this.router.navigate(['/checkout']);
  }

  goToLogin() {
    this.showGuestAuthModal.set(false);
    this.router.navigate(['/login']);
  }

  goToSignUp() {
    this.showGuestAuthModal.set(false);
    this.router.navigate(['/signup']);
  }

  goToExplore() {
    this.router.navigate(['/home']);
  }
}
