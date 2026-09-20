import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, IconComponent],
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage {
  cart = inject(CartService);
  private router = inject(Router);

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }

  goToExplore() {
    this.router.navigate(['/home']);
  }
}
