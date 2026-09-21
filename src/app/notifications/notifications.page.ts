import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService, AppNotification } from '../services/notification.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { IconComponent } from '../components/icon/icon.component';

@Component({
  selector: 'app-notifications-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, IconComponent],
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class NotificationsPage {
  notifService = inject(NotificationService);
  private router = inject(Router);

  activeFilter = signal<'all' | 'orders' | 'deals' | 'system'>('all');

  filteredNotifications = computed(() => {
    const list = this.notifService.notifications();
    const filter = this.activeFilter();
    if (filter === 'orders') {
      return list.filter(n => n.icon === 'truck');
    }
    if (filter === 'deals') {
      return list.filter(n => n.icon === 'gift');
    }
    if (filter === 'system') {
      return list.filter(n => n.icon === 'sliders' || (n.icon !== 'truck' && n.icon !== 'gift'));
    }
    return list;
  });

  setFilter(f: 'all' | 'orders' | 'deals' | 'system') {
    this.activeFilter.set(f);
  }

  handleNotificationClick(notif: AppNotification) {
    if (notif.isUnread) {
      this.notifService.notifications.update(list =>
        list.map(n => n.id === notif.id ? { ...n, isUnread: false } : n)
      );
    }

    if (notif.icon === 'truck') {
      this.router.navigate(['/orders']);
    } else if (notif.icon === 'gift') {
      this.router.navigate(['/home']);
    } else if (notif.icon === 'sliders') {
      this.router.navigate(['/profile']);
    }
  }

  markAllRead() {
    this.notifService.markAllAsRead();
  }

  dismissNotification(id: string, event: Event) {
    event.stopPropagation();
    this.notifService.dismiss(id);
  }
}
