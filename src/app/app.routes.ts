import { Routes } from '@angular/router';

import { InicioPage } from './pages/inicio/inicio.page';
import { ProductosPage } from './pages/productos/productos.page';

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
    path: '**',
    redirectTo: 'inicio',
  },
];
