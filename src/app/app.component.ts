import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TabbarComponent } from './components/tabbar/tabbar.component';
import { CartService } from './services/cart.service';
import { NotificationService } from './services/notification.service';

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
  notifService = inject(NotificationService);

  readonly currentUrl = signal<string>(this.router.url);

  constructor() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.currentUrl.set(e.urlAfterRedirects || e.url);
    });
  }

  shouldShowTabBar(): boolean {
    const url = this.currentUrl();
    // Hide tabbar only on detail, checkout, receipt, and auth/splash screens
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
