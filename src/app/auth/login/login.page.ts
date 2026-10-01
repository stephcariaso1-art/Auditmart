import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  private auth = inject(AuthService);
  private cart = inject(CartService);
  private router = inject(Router);

  email = 'alex.rivera@audiomart.io';
  errorMessage = '';

  onSubmit() {
    if (!this.email || !this.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }
    this.auth.login(this.email, '');
    this.router.navigate(['/home']);
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  goHome() {
    this.auth.setGuestMode(true);
    this.cart.clearCart();
    this.router.navigate(['/home']);
  }
}
