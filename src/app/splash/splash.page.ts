import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../components/icon/icon.component';

@Component({
  selector: 'app-splash-page',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss']
})
export class SplashPage implements OnInit, OnDestroy {
  private router = inject(Router);
  private timerRef: any;

  ngOnInit() {
    this.timerRef = setTimeout(() => {
      this.continue();
    }, 2600);
  }

  ngOnDestroy() {
    if (this.timerRef) {
      clearTimeout(this.timerRef);
    }
  }

  continue() {
    if (this.timerRef) {
      clearTimeout(this.timerRef);
      this.timerRef = null;
    }
    this.router.navigate(['/login']);
  }
}
