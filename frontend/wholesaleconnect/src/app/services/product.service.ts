import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';
import { sample_products } from '../../data';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PRODUCTS_BY_STORE_ID_URL, PRODUCTS_URL, PRODUCT_BY_ID_IRL, PRODUCT_DELETE_URL, PRODUCT_MODIFY_URL, PRODUCT_REGISTER_URL } from '../shared/urls';
import { IProductRegister } from '../shared/interfaces/IProductRegister';
import { ToastrService } from 'ngx-toastr';
import { IProductModify } from '../shared/interfaces/IProductModify';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient, private toastrService:ToastrService) { }

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

  register(productRegister:IProductRegister): Observable<Product>{
    return this.http.post<Product>(PRODUCT_REGISTER_URL,productRegister).pipe(
      tap({
        next: (user)=>{
          this.toastrService.success(
            'Product Register Succesful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Product register Failed' );
        }
      })
    )
  }

  editProduct(productRegister:IProductModify): Observable<Product>{
    return this.http.put<Product>(PRODUCT_MODIFY_URL,productRegister).pipe(
      tap({
        next: (user)=>{
          this.toastrService.success(
            'Product Modification Succesful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Product Edit Failed' );
        }
      })
    )
  }

  deleteProductById(productId:string):Observable<Product>{
    return this.http.delete<Product>(PRODUCT_DELETE_URL + productId).pipe(
      tap({
        next: (user)=>{
          this.toastrService.success(
            'Product Deletion Succesful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Product Deletion Failed' );
        }
      })
    )
  }

}
