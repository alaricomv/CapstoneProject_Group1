import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ORDER_BY_USER_URL, ORDER_BY_STORE_URL, ORDER_MODIFY_URL } from '../shared/urls';
import { IOrderRegister } from '../shared/interfaces/IOrderRegister';
import { IOrderModify } from '../shared/interfaces/IOrderModify';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  constructor(private http:HttpClient, private toastrService:ToastrService) {
   }

  getAllOrdersByUserId(sellerId:number):Observable<Order[]>{
    const stringStoreId = sellerId.toString()
    return this.http.get<Order[]>(ORDER_BY_USER_URL + stringStoreId);
  }

  getAllOrdersByStoreId(sellerId:number):Observable<Order[]>{
    const stringStoreId = sellerId.toString()
    return this.http.get<Order[]>(ORDER_BY_STORE_URL + stringStoreId);
  }

  register(orderRegister:IOrderModify): Observable<Order>{
    return this.http.put<Order>(ORDER_MODIFY_URL,orderRegister).pipe(
      tap({
        next: (user)=>{
          this.toastrService.success(
            'Order Succesfully made'
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Order Failed' );
        }
      })
    )
  }
}
