import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent } from '@ionic/angular';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
  imports: [CommonModule, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton],
})
export class NosotrosPage implements OnInit {
  private readonly geolocation = inject(GeolocationService);
  readonly ubicacion = signal('Solicitando ubicación...');
  readonly distancia = signal<number | null>(null);
  readonly errorUbicacion = signal<string | null>(null);
  readonly solicitandoUbicacion = signal(false);

  ngOnInit() { void this.actualizarUbicacion(); }

  async actualizarUbicacion() {
    this.solicitandoUbicacion.set(true);
    this.errorUbicacion.set(null);
    this.ubicacion.set('Solicitando ubicación...');
    this.distancia.set(null);
    try {
      const { latitude, longitude } = await this.geolocation.getCurrentPosition();
      const oficina = this.geolocation.getOficinaCoords();
      this.ubicacion.set(`Latitud: ${latitude.toFixed(4)} / Longitud: ${longitude.toFixed(4)}`);
      this.distancia.set(this.geolocation.calcularDistancia(latitude, longitude, oficina.lat, oficina.lon));
    } catch (error) {
      console.error('No se pudo obtener la ubicación.', error);
      this.ubicacion.set('Ubicación no disponible');
      this.errorUbicacion.set(
        error instanceof Error ? error.message : 'No se pudo obtener la ubicación. Revisa los permisos del sitio.',
      );
    } finally {
      this.solicitandoUbicacion.set(false);
    }
  }
}
