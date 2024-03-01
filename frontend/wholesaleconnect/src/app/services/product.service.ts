import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';
import { sample_products } from '../../data';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PRODUCTS_URL } from '../shared/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCTS_URL);
  }
}
