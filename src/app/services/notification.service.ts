import { Injectable, signal, computed } from '@angular/core';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  isUnread: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly showModal = signal<boolean>(false);

  readonly notifications = signal<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Acoustic Air Delivery',
      message: 'Your JBL Live 660NC order #98421 is on its way with priority courier.',
      time: '15m ago',
      icon: 'truck',
      isUnread: true
    },
    {
      id: 'notif-2',
      title: 'VIP 20% Discount Unlocked',
      message: 'Use code VIP20 at checkout for 20% off all Sony and Bose studio gear.',
      time: '2h ago',
      icon: 'gift',
      isUnread: true
    },
    {
      id: 'notif-3',
      title: 'Spatial Audio 2.0 Firmware',
      message: 'New high-resolution audio EQ profiles available in your profile settings.',
      time: '1d ago',
      icon: 'sliders',
      isUnread: false
    }
  ]);

  readonly unreadCount = computed(() => {
    return this.notifications().filter(n => n.isUnread).length;
  });

  open() {
    this.showModal.set(true);
  }

  close() {
    this.showModal.set(false);
  }

  markAllAsRead() {
    this.notifications.update(list => list.map(n => ({ ...n, isUnread: false })));
  }

  dismiss(id: string) {
    this.notifications.update(list => list.filter(n => n.id !== id));
  }
}
