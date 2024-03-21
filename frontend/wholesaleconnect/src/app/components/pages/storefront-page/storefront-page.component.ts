import { Component, OnInit } from '@angular/core';
import { Storefront } from '../../../shared/models/store';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-storefront-page',
  templateUrl: './storefront-page.component.html',
  styleUrl: './storefront-page.component.css'
})
export class StorefrontPageComponent implements OnInit{

  products: Product[] = [];

  storefront!: Storefront;

  constructor(private activatedRoute: ActivatedRoute, private storeService:StoreService, private productService:ProductService) {

  }

  ngOnInit(): void {
   this.activatedRoute.params.subscribe((params) => {
      this.storeService.getStoreById(params['id']).subscribe(serverProduct =>{
        console.log("here");
        console.log(serverProduct);
        this.storefront = serverProduct;
        this.fetchProducts();
      });
    })
    
  }

  fetchProducts(): void{
    this.productService.getProductByStore(this.storefront.id).subscribe(products =>{
      this.products = products;
    });
    }

}
