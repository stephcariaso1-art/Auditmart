import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <header class="w-full px-5 pt-4 pb-2 flex items-center justify-between z-30 select-none bg-[#141416]/90 backdrop-blur-md sticky top-0">
      <!-- Left Action: Back button (ONLY if showBack is true), Menu on Home, or Empty spacer for main tabs -->
      @if (showBack) {
        <button 
          (click)="onBack()" 
          class="w-10 h-10 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer">
          <app-icon name="arrow-left" [size]="20" color="#FFFFFF"></app-icon>
        </button>
      } @else if (!title) {
        <button 
          (click)="leftAction.emit()" 
          class="w-10 h-10 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer">
          <app-icon name="menu" [size]="20" color="#FFFFFF"></app-icon>
        </button>
      } @else {
        <!-- Main tabs (Cart, Orders, etc.) have NO back button; spacer balances the notification icon -->
        <div class="w-10 h-10"></div>
      }

      <!-- Center Title or App Logo -->
      <div class="flex-1 text-center">
        @if (title) {
          <h1 class="text-base font-bold tracking-wide text-white">{{ title }}</h1>
        } @else {
          <h1 class="text-lg font-black tracking-tight text-white flex items-center justify-center gap-0.5 font-sans">
            <span>audi</span><span class="text-white/70 font-semibold">Mart</span>
          </h1>
        }
      </div>

      <!-- Right Action (Notification Bell) -->
      <div class="relative w-10 h-10 flex items-center justify-center">
        @if (hasNotification) {
          <button 
            (click)="onRightClick()" 
            class="w-10 h-10 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer">
            <app-icon [name]="rightIcon" [size]="20" color="#FFFFFF"></app-icon>
            @if (notifService.unreadCount() > 0) {
              <span class="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#141416]"></span>
            }
          </button>
        }
      </div>
    </header>
  `
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
