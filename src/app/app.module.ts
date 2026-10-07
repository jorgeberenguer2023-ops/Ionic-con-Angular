import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';
import { IonicModule } from '@ionic/angular/lazy';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { InicioPage } from './pages/inicio/inicio.page';
import { ProductosPage } from './pages/productos/productos.page';
import { UsuariosPage } from './pages/usuarios/usuarios.page';

@NgModule({
  declarations: [AppComponent, InicioPage, ProductosPage, UsuariosPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
