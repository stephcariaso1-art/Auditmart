import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, IconComponent],
  template: `
    <div class="w-full min-h-screen bg-[#141416] text-white flex flex-col pb-32 select-none animate-fade-in relative">
      
      <!-- Top Navbar (matches Figma 71:6 Profile wireframe) -->
      <app-navbar 
        [title]="'Profile'" 
        [showBack]="true"
        backUrl="/home">
      </app-navbar>

      <div class="px-5 space-y-5 pt-2 flex-1">
        
        <!-- User Avatar & Header (matches top circle in 71:6 wireframe) -->
        <div class="flex flex-col items-center text-center space-y-3 pt-2">
          
          <div class="relative w-22 h-22 rounded-full p-1 border-2 border-white/20">
            <img 
              [src]="user()?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'" 
              alt="Profile" 
              class="w-20 h-20 object-cover rounded-full shadow-lg" />
            <div class="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shadow-md">
              <app-icon name="check" [size]="12" color="#000000" [strokeWidth]="3"></app-icon>
            </div>
          </div>

          <div class="space-y-1">
            <h2 class="text-base font-bold tracking-tight text-white">{{ user()?.name || 'Alex Rivera' }}</h2>
            <p class="text-xs text-[#8E8E93]">{{ user()?.email || 'alex.rivera@audiomart.io' }}</p>
            <span class="inline-block mt-0.5 px-3 py-0.5 rounded-full bg-white/10 text-[10px] font-extrabold uppercase tracking-wider text-white border border-white/10">
              {{ user()?.memberTier || 'Audiophile VIP Club' }}
            </span>
          </div>

        </div>

        <!-- Settings Options Pills (matches vertical pill containers in 71:6 wireframe) -->
        <div class="space-y-2.5 pt-2">
          
          <!-- Option 1: Personal Information -->
          <button 
            (click)="openModal('personal')"
            class="w-full p-4 rounded-2xl bg-[#222226] hover:bg-[#2A2A30] border border-white/[0.05] flex items-center justify-between transition-colors shadow-xs active:scale-[0.99]">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/80">
                <app-icon name="profile" [size]="16" color="#FFFFFF"></app-icon>
              </div>
              <div class="text-left">
                <span class="text-xs font-bold text-white block">Personal Information</span>
                <span class="text-[10px] text-[#7E7E88]">Name, Email, Phone</span>
              </div>
            </div>
            <app-icon name="arrow-right" [size]="14" color="#8E8E93"></app-icon>
          </button>

          <!-- Option 2: Shipping Addresses -->
          <button 
            (click)="openModal('address')"
            class="w-full p-4 rounded-2xl bg-[#222226] hover:bg-[#2A2A30] border border-white/[0.05] flex items-center justify-between transition-colors shadow-xs active:scale-[0.99]">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/80">
                <app-icon name="map-pin" [size]="16" color="#FFFFFF"></app-icon>
              </div>
              <div class="text-left">
                <span class="text-xs font-bold text-white block">Shipping Address</span>
                <span class="text-[10px] text-[#7E7E88] truncate max-w-[200px] block">{{ user()?.address || '742 Evergreen Terrace' }}</span>
              </div>
            </div>
            <app-icon name="arrow-right" [size]="14" color="#8E8E93"></app-icon>
          </button>

          <!-- Option 3: Payment Cards & Wallets -->
          <button 
            (click)="openModal('payment')"
            class="w-full p-4 rounded-2xl bg-[#222226] hover:bg-[#2A2A30] border border-white/[0.05] flex items-center justify-between transition-colors shadow-xs active:scale-[0.99]">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/80">
                <app-icon name="credit-card" [size]="16" color="#FFFFFF"></app-icon>
              </div>
              <div class="text-left">
                <span class="text-xs font-bold text-white block">Payment Cards & Wallets</span>
                <span class="text-[10px] text-[#7E7E88]">Mastercard •••• 4242, Apple Pay</span>
              </div>
            </div>
            <app-icon name="arrow-right" [size]="14" color="#8E8E93"></app-icon>
          </button>

          <!-- Option 4: Equalizer & Audio Preferences -->
          <button 
            (click)="openModal('equalizer')"
            class="w-full p-4 rounded-2xl bg-[#222226] hover:bg-[#2A2A30] border border-white/[0.05] flex items-center justify-between transition-colors shadow-xs active:scale-[0.99]">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/80">
                <app-icon name="sliders" [size]="16" color="#FFFFFF"></app-icon>
              </div>
              <div class="text-left">
                <span class="text-xs font-bold text-white block">Equalizer & Audio Profiles</span>
                <span class="text-[10px] text-[#7E7E88]">Bass, Mids, Treble, Spatial 360°</span>
              </div>
            </div>
            <app-icon name="arrow-right" [size]="14" color="#8E8E93"></app-icon>
          </button>

        </div>

        <!-- Working Logout Button (matches bottom pill in 71:6 wireframe) -->
        <div class="pt-2">
          <button 
            (click)="logout()"
            class="w-full py-3.5 rounded-full bg-[#222226] hover:bg-red-500/20 text-red-400 font-bold text-xs tracking-wider uppercase border border-red-500/30 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm">
            <app-icon name="log-out" [size]="16" color="#F87171"></app-icon>
            <span>Log Out</span>
          </button>
        </div>

      </div>

      <!-- ================= MODAL 1: PERSONAL INFORMATION ================= -->
      @if (activeModal() === 'personal') {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-xs animate-fade-in"
             (click)="closeModal()">
          <div class="w-full max-w-sm bg-[#1E1E22] rounded-[32px] p-6 space-y-4 border border-white/10 shadow-2xl"
               (click)="$event.stopPropagation()">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-white">Personal Information</h3>
              <button (click)="closeModal()" class="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center text-xs">✕</button>
            </div>

            <div class="space-y-3 pt-1">
              <div>
                <label class="text-[11px] font-semibold text-[#8E8E93] block mb-1">Full Name</label>
                <input 
                  type="text" 
                  [(ngModel)]="editName" 
                  class="w-full px-3.5 py-2.5 rounded-xl bg-[#28282E] border border-white/10 text-xs text-white focus:outline-none focus:border-white/40" />
              </div>

              <div>
                <label class="text-[11px] font-semibold text-[#8E8E93] block mb-1">Email</label>
                <input 
                  type="email" 
                  [(ngModel)]="editEmail" 
                  class="w-full px-3.5 py-2.5 rounded-xl bg-[#28282E] border border-white/10 text-xs text-white focus:outline-none focus:border-white/40" />
              </div>

              <div>
                <label class="text-[11px] font-semibold text-[#8E8E93] block mb-1">Phone</label>
                <input 
                  type="text" 
                  [(ngModel)]="editPhone" 
                  class="w-full px-3.5 py-2.5 rounded-xl bg-[#28282E] border border-white/10 text-xs text-white focus:outline-none focus:border-white/40" />
              </div>
            </div>

            <div class="pt-2">
              <button 
                (click)="savePersonalInfo()"
                class="w-full py-3 rounded-full bg-white text-black text-xs font-bold shadow-md hover:bg-neutral-200 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      }

      <!-- ================= MODAL 2: SHIPPING ADDRESS ================= -->
      @if (activeModal() === 'address') {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-xs animate-fade-in"
             (click)="closeModal()">
          <div class="w-full max-w-sm bg-[#1E1E22] rounded-[32px] p-6 space-y-4 border border-white/10 shadow-2xl"
               (click)="$event.stopPropagation()">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-white">Shipping Address</h3>
              <button (click)="closeModal()" class="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center text-xs">✕</button>
            </div>

            <div class="space-y-3 pt-1">
              <div>
                <label class="text-[11px] font-semibold text-[#8E8E93] block mb-1">Street Address</label>
                <textarea 
                  [(ngModel)]="editAddress" 
                  rows="3"
                  class="w-full px-3.5 py-2.5 rounded-xl bg-[#28282E] border border-white/10 text-xs text-white focus:outline-none focus:border-white/40 leading-relaxed"></textarea>
              </div>
            </div>

            <div class="pt-2">
              <button 
                (click)="saveAddress()"
                class="w-full py-3 rounded-full bg-white text-black text-xs font-bold shadow-md hover:bg-neutral-200 transition-colors">
                Save Shipping Address
              </button>
            </div>
          </div>
        </div>
      }

      <!-- ================= MODAL 3: PAYMENT CARDS ================= -->
      @if (activeModal() === 'payment') {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-xs animate-fade-in"
             (click)="closeModal()">
          <div class="w-full max-w-sm bg-[#1E1E22] rounded-[32px] p-6 space-y-4 border border-white/10 shadow-2xl"
               (click)="$event.stopPropagation()">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-white">Payment Cards</h3>
              <button (click)="closeModal()" class="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center text-xs">✕</button>
            </div>

            <!-- Existing Cards -->
            <div class="space-y-2.5 pt-1">
              @for (card of auth.paymentCards(); track card.id) {
                <div class="p-3 rounded-2xl bg-[#28282E] border border-white/10 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs">
                      💳
                    </div>
                    <div>
                      <p class="text-xs font-bold text-white">{{ card.type }} •••• {{ card.last4 }}</p>
                      <p class="text-[10px] text-[#7E7E88]">Expires {{ card.exp }}</p>
                    </div>
                  </div>
                  @if (card.isDefault) {
                    <span class="px-2 py-0.5 rounded-full bg-white text-black text-[9px] font-bold uppercase">Default</span>
                  } @else {
                    <button 
                      (click)="auth.setDefaultCard(card.id)"
                      class="text-[10px] text-white/60 hover:text-white underline">
                      Make Default
                    </button>
                  }
                </div>
              }
            </div>

            <div class="pt-2">
              <button 
                (click)="addNewDemoCard()"
                class="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors">
                + Add New Payment Card
              </button>
            </div>
          </div>
        </div>
      }

      <!-- ================= MODAL 4: EQUALIZER & AUDIO PROFILES ================= -->
      @if (activeModal() === 'equalizer') {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-xs animate-fade-in"
             (click)="closeModal()">
          <div class="w-full max-w-sm bg-[#1E1E22] rounded-[32px] p-6 space-y-4 border border-white/10 shadow-2xl"
               (click)="$event.stopPropagation()">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-sm font-bold text-white">Equalizer & Audio EQ</h3>
                <p class="text-[11px] text-[#7E7E88]">VibraTune DSP Acoustic Engine</p>
              </div>
              <button (click)="closeModal()" class="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center text-xs">✕</button>
            </div>

            <!-- EQ Presets -->
            <div class="grid grid-cols-2 gap-2 pt-1">
              <button 
                (click)="applyPreset('Bass Boost', 8, 2, -1)"
                class="p-2.5 rounded-xl border text-left transition-colors"
                [ngClass]="activePreset === 'Bass Boost' ? 'bg-white text-black border-white' : 'bg-[#28282E] text-white border-white/5'">
                <span class="text-xs font-bold block">Bass Boost</span>
                <span class="text-[10px] opacity-75">+8dB Deep Bass</span>
              </button>

              <button 
                (click)="applyPreset('Studio Pure', 0, 0, 0)"
                class="p-2.5 rounded-xl border text-left transition-colors"
                [ngClass]="activePreset === 'Studio Pure' ? 'bg-white text-black border-white' : 'bg-[#28282E] text-white border-white/5'">
                <span class="text-xs font-bold block">Studio Pure</span>
                <span class="text-[10px] opacity-75">Flat Response</span>
              </button>
            </div>

            <!-- EQ Sliders -->
            <div class="space-y-3 pt-2">
              <div class="space-y-1">
                <div class="flex justify-between text-[11px]">
                  <span class="text-[#8E8E93]">Bass (60 Hz)</span>
                  <span class="text-white font-mono font-bold">{{ bassLevel > 0 ? '+' : '' }}{{ bassLevel }} dB</span>
                </div>
                <input type="range" min="-12" max="12" [(ngModel)]="bassLevel" class="w-full accent-white cursor-pointer" />
              </div>

              <div class="space-y-1">
                <div class="flex justify-between text-[11px]">
                  <span class="text-[#8E8E93]">Mids (1 kHz)</span>
                  <span class="text-white font-mono font-bold">{{ midsLevel > 0 ? '+' : '' }}{{ midsLevel }} dB</span>
                </div>
                <input type="range" min="-12" max="12" [(ngModel)]="midsLevel" class="w-full accent-white cursor-pointer" />
              </div>

              <div class="space-y-1">
                <div class="flex justify-between text-[11px]">
                  <span class="text-[#8E8E93]">Treble (16 kHz)</span>
                  <span class="text-white font-mono font-bold">{{ trebleLevel > 0 ? '+' : '' }}{{ trebleLevel }} dB</span>
                </div>
                <input type="range" min="-12" max="12" [(ngModel)]="trebleLevel" class="w-full accent-white cursor-pointer" />
              </div>
            </div>

            <div class="pt-2">
              <button 
                (click)="saveEqualizer()"
                class="w-full py-3 rounded-full bg-white text-black text-xs font-bold shadow-md hover:bg-neutral-200 transition-colors">
                Apply & Save EQ
              </button>
            </div>
          </div>
        </div>
      }

    </div>
  `
})
export class ProfilePage {
  auth = inject(AuthService);
  private cart = inject(CartService);
  private router = inject(Router);

  user = this.auth.currentUser;
  activeModal = signal<'personal' | 'address' | 'payment' | 'equalizer' | null>(null);

  // Edit fields
  editName = '';
  editEmail = '';
  editPhone = '';
  editAddress = '';

  // Equalizer fields
  activePreset = 'Bass Boost';
  bassLevel = 8;
  midsLevel = 2;
  trebleLevel = -1;

  openModal(type: 'personal' | 'address' | 'payment' | 'equalizer') {
    const u = this.user();
    if (u) {
      this.editName = u.name;
      this.editEmail = u.email;
      this.editPhone = u.phone;
      this.editAddress = u.address;
    }
    this.activeModal.set(type);
  }

  closeModal() {
    this.activeModal.set(null);
  }

  savePersonalInfo() {
    this.auth.updateProfile(this.editName, this.editEmail, this.editPhone);
    this.cart.showToast('Profile updated successfully');
    this.closeModal();
  }

  saveAddress() {
    this.auth.updateAddress(this.editAddress);
    this.cart.showToast('Shipping address saved');
    this.closeModal();
  }

  addNewDemoCard() {
    this.auth.addPaymentCard('Visa', '5521', '08/29');
    this.cart.showToast('Added Visa •••• 5521');
  }

  applyPreset(preset: string, b: number, m: number, t: number) {
    this.activePreset = preset;
    this.bassLevel = b;
    this.midsLevel = m;
    this.trebleLevel = t;
  }

  saveEqualizer() {
    this.cart.showToast(`Equalizer profile "${this.activePreset}" applied`);
    this.closeModal();
  }

  logout() {
    this.auth.logout();
    this.cart.showToast('Logged out successfully');
    this.router.navigate(['/login']);
  }
}
