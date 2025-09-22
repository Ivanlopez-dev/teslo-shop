import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { ProductsResponse } from '@products/interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(): Observable<ProductsResponse> {
    return this.http
      .get<ProductsResponse>('http://localhost:3000/api/products')
      .pipe(tap((resp) => console.log(resp)));
  }
}
