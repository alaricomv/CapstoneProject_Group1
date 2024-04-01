import { Component,OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{

  product!: Product;
  constructor(activatedRoute: ActivatedRoute, productService:ProductService) {
    activatedRoute.params.subscribe((params) => {
      productService.getProductById(params['id']).subscribe(serverProduct =>{
        console.log("here");
        console.log(serverProduct);
        this.product = serverProduct;
      });
    })

  }

  ngOnInit(): void {
    
  }


}
