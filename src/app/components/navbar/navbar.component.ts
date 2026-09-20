import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <header class="w-full px-5 pt-4 pb-3 flex items-center justify-between z-30 select-none bg-[#141416]/90 backdrop-blur-md sticky top-0">
      <!-- Left Action -->
      @if (showBack) {
        <button 
          (click)="onBack()" 
          class="w-10 h-10 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 active:scale-95 transition-all">
          <app-icon name="arrow-left" [size]="20" color="#FFFFFF"></app-icon>
        </button>
      } @else {
        <button 
          (click)="leftAction.emit()" 
          class="w-10 h-10 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 active:scale-95 transition-all">
          <app-icon name="menu" [size]="22" color="#FFFFFF"></app-icon>
        </button>
      }

      <!-- Center Title or Logo -->
      <div class="flex-1 text-center">
        @if (title) {
          <h1 class="text-base font-semibold tracking-wide text-white">{{ title }}</h1>
        } @else {
          <h1 class="text-xl font-extrabold tracking-tight text-white flex items-center justify-center gap-1.5 font-sans">
            <span>Vibra</span><span class="text-white/80 font-medium">Tune</span>
          </h1>
        }
      </div>

      <!-- Right Action (Notification Bell or Custom) -->
      <div class="relative">
        <button 
          (click)="onRightClick()" 
          class="w-10 h-10 rounded-full flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 active:scale-95 transition-all">
          <app-icon [name]="rightIcon" [size]="21" color="#FFFFFF"></app-icon>
          @if (hasNotification) {
            <span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#141416]"></span>
          }
        </button>
      </div>
    </header>
  `
})
export class NavbarComponent {
  private location = inject(Location);
  private router = inject(Router);

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
      this.router.navigate(['/orders']);
    }
  }
}
