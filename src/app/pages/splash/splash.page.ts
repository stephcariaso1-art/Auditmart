import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-splash-page',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss']
})
export class SplashPage {
  private router = inject(Router);

  continue() {
    this.router.navigate(['/login']);
  }
}
