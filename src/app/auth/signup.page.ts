import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IconComponent } from '../components/icon/icon.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  onSubmit() {
    if (!this.email || !this.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }
    if (!this.password) {
      this.errorMessage = 'Please create a password';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const name = this.email.split('@')[0] || 'Member';
    this.auth.signup(name, this.email, this.password);
    this.router.navigate(['/home']);
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
