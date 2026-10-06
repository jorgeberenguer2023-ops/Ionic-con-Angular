import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  readonly isDark = signal(false);

  toggle(): void {
    const isDark = !this.isDark();
    this.isDark.set(isDark);
    document.documentElement.classList.toggle('dark-theme', isDark);
  }
}
