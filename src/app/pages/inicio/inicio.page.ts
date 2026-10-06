import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  // AppModule is required by the requested NgModule architecture.
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
export class InicioPage {
  readonly darkModeService = inject(DarkModeService);
  readonly darkMode = this.darkModeService.isDark;
}
