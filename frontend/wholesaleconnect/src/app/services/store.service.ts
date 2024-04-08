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


  private storeSubject = new BehaviorSubject<Storefront>(this.getStoreFromLocalStorage());
  public storeObservable:Observable<Storefront>;
  constructor(private http:HttpClient, private toastrService:ToastrService) { 
    this.storeObservable = this.storeSubject.asObservable();
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

  private setStoreToLocalStorage(store:Storefront){
    localStorage.setItem('Store', JSON.stringify(store));
  }

    //Gets the user from the local storage, if there is no user it sends an empty user
  private getStoreFromLocalStorage():Storefront{
      const userJson = localStorage.getItem('Store');
      if(userJson){
        return JSON.parse(userJson) as Storefront;
      }
      return new Storefront();
    }

}
