import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { TabbarComponent } from './components/tabbar/tabbar.component';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TabbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private router = inject(Router);
  cart = inject(CartService);

  shouldShowTabBar(): boolean {
    const url = this.router.url;
    // Show tabbar on main browsing screens, hide on details, checkout, receipt, auth, and splash
    if (
      url.includes('/product/') ||
      url.includes('/checkout') ||
      url.includes('/receipt') ||
      url.includes('/login') ||
      url.includes('/signup') ||
      url.includes('/splash')
    ) {
      return false;
    }
    return true;
  }
}
