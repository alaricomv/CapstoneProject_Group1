import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';
import { sample_products } from '../../data';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PRODUCTS_BY_STORE_ID_URL, PRODUCTS_URL, PRODUCT_BY_ID_IRL } from '../shared/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Product[]>{
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  getProductById(productId:string):Observable<Product>{
    return this.http.get<Product>(PRODUCT_BY_ID_IRL + productId);
  }

  getProductByStore(productId:number):Observable<Product[]>{
    const stringStoreId = productId.toString()
    return this.http.get<Product[]>(PRODUCTS_BY_STORE_ID_URL + stringStoreId);
  }
}
