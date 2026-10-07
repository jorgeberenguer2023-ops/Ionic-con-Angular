import { Routes } from '@angular/router';

import { InicioPage } from './pages/inicio/inicio.page';
import { ProductosPage } from './pages/productos/productos.page';
import { UsuariosPage } from './pages/usuarios/usuarios.page';

export const routes: Routes = [
  {
    path: 'inicio',
    component: InicioPage,
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'productos',
    component: ProductosPage,
  },
  {
    path: 'usuarios',
    component: UsuariosPage,
  },
  {
    path: '**',
    redirectTo: 'inicio',
  },
];
