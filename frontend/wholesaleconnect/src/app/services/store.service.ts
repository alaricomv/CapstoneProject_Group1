import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/models/User';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { IStoreRegister } from '../shared/interfaces/IStoreRegister';
import { Storefront } from '../shared/models/store';
import { STOREFRONT_BY_ID_URL, STOREFRONT_BY_SELLERID_URL, STORE_REGISTER_URL } from '../shared/urls';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {


  
  constructor(private http:HttpClient, private toastrService:ToastrService) { 
  }

  register(storeRegister:IStoreRegister): Observable<Storefront>{
    console.log(storeRegister.logo)
    return this.http.post<Storefront>(STORE_REGISTER_URL,storeRegister).pipe(
      tap({
        next: (user)=>{
          this.toastrService.success(
            'Store Register Succesful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Store register Failed' );
        }
      })
    )
  }

  getStoreById(storeId:number):Observable<Storefront>{
    return this.http.get<Storefront>(STOREFRONT_BY_ID_URL + storeId);
  }

  getAllBySellerId(sellerId:number):Observable<Storefront[]>{
    const stringStoreId = sellerId.toString()
    return this.http.get<Storefront[]>(STOREFRONT_BY_SELLERID_URL + stringStoreId);
  }

}
