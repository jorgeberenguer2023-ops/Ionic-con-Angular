import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(new URL('assets/data/products.json', document.baseURI));
    if (!response.ok) {
      throw new Error(`No se pudo cargar el catálogo de productos (HTTP ${response.status}).`);
    }

    const products = (await response.json()) as Product[];
    if (!Array.isArray(products)) {
      throw new Error('El catálogo de productos tiene un formato no válido.');
    }

    return products;
  }
}
