import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private location = inject(Location);
  private router = inject(Router);
  notifService = inject(NotificationService);

  @Input() title: string = '';
  @Input() showBack: boolean = false;
  @Input() backUrl?: string;
  @Input() rightIcon: string = 'bell';
  @Input() hasNotification: boolean = true;

  @Output() leftAction = new EventEmitter<void>();
  @Output() rightAction = new EventEmitter<void>();

  onBack() {
    if (this.backUrl) {
      this.router.navigateByUrl(this.backUrl);
    } else {
      this.location.back();
    }
  }

  onRightClick() {
    if (this.rightAction.observed) {
      this.rightAction.emit();
    } else {
      this.notifService.open();
    }
  }
}
