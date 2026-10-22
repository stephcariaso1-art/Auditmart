import { Injectable, signal, computed, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'audi_mart_theme';

  // Default to light mode per feedback, with instant dark mode toggle capability
  readonly currentTheme = signal<ThemeMode>(this.getInitialTheme());
  readonly isDark = computed(() => this.currentTheme() === 'dark');

  constructor() {
    this.applyTheme(this.currentTheme());

    // Reactively update DOM and local storage when theme changes
    effect(() => {
      const theme = this.currentTheme();
      this.applyTheme(theme);
      try {
        localStorage.setItem(this.STORAGE_KEY, theme);
      } catch (e) {
        console.warn('Could not save theme to localStorage', e);
      }
    });
  }

  private getInitialTheme(): ThemeMode {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch {
      // Fallback
    }
    // Default to light mode
    return 'light';
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.currentTheme.set(nextTheme);
  }

  setTheme(theme: ThemeMode): void {
    this.currentTheme.set(theme);
  }

  private applyTheme(theme: ThemeMode): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);

    if (body) {
      body.classList.remove('light', 'dark');
      body.classList.add(theme);
      body.setAttribute('data-theme', theme);
    }
  }
}
