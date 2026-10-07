import { Component, inject, signal } from '@angular/core';

import { User } from '../../models/user.model';
import { DarkModeService } from '../../services/dark-mode.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  // AppModule is required by the requested NgModule architecture.
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
export class UsuariosPage {
  private readonly userService = inject(UserService);
  readonly darkModeService = inject(DarkModeService);
  readonly users = signal<User[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly darkMode = this.darkModeService.isDark;

  constructor() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.error.set('');

    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        console.error('No se han podido cargar los usuarios.', error);
        this.error.set('No se han podido cargar los usuarios.');
        this.loading.set(false);
      },
    });
  }
}
