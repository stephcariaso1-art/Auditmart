import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TabbarComponent } from './components/tabbar/tabbar.component';
import { IconComponent } from './components/icon/icon.component';
import { CartService } from './services/cart.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TabbarComponent, IconComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  cart = inject(CartService);
  notifService = inject(NotificationService);

  readonly showSplash = signal<boolean>(true);
  readonly isSplashFading = signal<boolean>(false);
  readonly currentUrl = signal<string>(this.router.url);

  constructor() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.currentUrl.set(e.urlAfterRedirects || e.url);
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.closeSplash();
    }, 2400);
  }

  closeSplash() {
    if (!this.showSplash()) return;
    this.isSplashFading.set(true);
    setTimeout(() => {
      this.showSplash.set(false);
    }, 350);
  }

  shouldShowTabBar(): boolean {
    const url = this.currentUrl();
    if (
      url.includes('/product/') ||
      url.includes('/checkout') ||
      url.includes('/receipt') ||
      url.includes('/login') ||
      url.includes('/signup') ||
      url.includes('/splash') ||
      url.includes('/notifications') ||
      url.includes('/payment-methods') ||
      url.includes('/shipping-addresses')
    ) {
      return false;
    }
    return true;
  }
}
