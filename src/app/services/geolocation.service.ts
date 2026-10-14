import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  private readonly oficina = { lat: 40.4452, lon: -3.6115 } as const;

  async getCurrentPosition(): Promise<Pick<Position['coords'], 'latitude' | 'longitude'>> {
    if (Capacitor.isNativePlatform()) {
      return (await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 20000 })).coords;
    }

    if (!navigator.geolocation) throw new Error('Este navegador no permite obtener la ubicación.');
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve(coords),
        ({ code }) => reject(new Error([
          'Permiso de ubicación denegado. En Edge, permite Ubicación en los permisos del sitio.',
          'El dispositivo no ha podido determinar la ubicación.',
          'Se agotó el tiempo de espera. Comprueba la señal e inténtalo de nuevo.',
        ][code - 1] ?? 'No se pudo obtener la ubicación.')),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 },
      ),
    );
  }

  calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    if (![lat1, lon1, lat2, lon2].every(Number.isFinite)) return 0;
    const rad = Math.PI / 180;
    const a = Math.sin(((lat2 - lat1) * rad) / 2) ** 2 +
      Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(((lon2 - lon1) * rad) / 2) ** 2;
    return Number((6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2));
  }

  getOficinaCoords() {
    return this.oficina;
  }
}
