import { Component } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: Product[] = [];

  constructor(private productService:ProductService){

    let productsObservable:Observable<Product[]>;
    productsObservable = productService.getAll();

    productsObservable.subscribe((serverProducts) =>{
      console.log("here");
      console.log(serverProducts);
      this.products = serverProducts;
    })
  }


}