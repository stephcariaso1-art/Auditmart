import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ThemeService } from '../../services/theme.service';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-tabbar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  templateUrl: './tabbar.component.html',
  styleUrls: ['./tabbar.component.scss']
})
export class TabbarComponent {
  private router = inject(Router);
  cart = inject(CartService);
  themeService = inject(ThemeService);

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
