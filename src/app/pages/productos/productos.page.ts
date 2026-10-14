import { Component, inject, OnInit, signal } from '@angular/core';
import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/angular';
import { Product } from '../../models/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCol],
})
export class ProductosPage implements OnInit {
  private readonly productService = inject(ProductsService);
  readonly products = signal<Product[]>([]);
  readonly cargando = signal(true);
  readonly errorCarga = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    try {
      this.products.set(await this.productService.getProducts());
    } catch (error) {
      console.error('No se pudo cargar el catálogo de productos.', error);
      this.errorCarga.set(
        error instanceof Error ? error.message : 'No se pudo cargar el catálogo de productos.',
      );
    } finally {
      this.cargando.set(false);
    }
  }
}
