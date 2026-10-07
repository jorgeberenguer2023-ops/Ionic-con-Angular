import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import {
  IonApp,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonRouterOutlet,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular';

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
    IonApp,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonRouterOutlet,
    IonSpinner,
    IonTitle,
    IonToolbar,
    RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
