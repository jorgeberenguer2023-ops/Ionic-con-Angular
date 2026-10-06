import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';

import { Product, ProductsResponse } from '../../models/product.model';
import { DarkModeService } from '../../services/dark-mode.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  // AppModule is required by the requested NgModule architecture.
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
})
export class ProductosPage {
  readonly pageSize = 12;
  private readonly productService = inject(ProductService);
  readonly darkModeService = inject(DarkModeService);
  readonly products = signal<Product[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly currentPage = signal(1);
  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize)),
  );
  readonly darkMode = this.darkModeService.isDark;

  constructor() {
    this.loadProducts();
  }

  loadProducts(page = this.currentPage()): void {
    this.loading.set(true);
    this.error.set('');

    this.productService
      .getProducts(this.pageSize, (page - 1) * this.pageSize)
      .subscribe({
      next: (response: ProductsResponse) => {
        this.products.set(response.products);
        this.total.set(response.total);
        this.currentPage.set(page);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        console.error('No se han podido cargar los productos.', error);
        this.error.set('No se han podido cargar los productos.');
        this.loading.set(false);
      },
    });
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.loadProducts(this.currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.loadProducts(this.currentPage() + 1);
    }
  }
}
