import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ORDER_BY_USER_URL, ORDER_BY_STORE_URL } from '../shared/urls';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private http:HttpClient) {
   }

  getAllOrdersByUserId(sellerId:number):Observable<Order[]>{
    const stringStoreId = sellerId.toString()
    return this.http.get<Order[]>(ORDER_BY_USER_URL + stringStoreId);
  }

  getAllOrdersByStoreId(sellerId:number):Observable<Order[]>{
    const stringStoreId = sellerId.toString()
    return this.http.get<Order[]>(ORDER_BY_STORE_URL + stringStoreId);
  }
}
