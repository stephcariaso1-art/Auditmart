import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-receipt-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, IconComponent],
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss']
})
export class ReceiptPage {
  private orderService = inject(OrderService);
  private router = inject(Router);

  order = this.orderService.latestOrder() || this.orderService.orders()[0];

  goHome() {
    this.router.navigate(['/home']);
  }

  viewOrders() {
    this.router.navigate(['/orders']);
  }
}
