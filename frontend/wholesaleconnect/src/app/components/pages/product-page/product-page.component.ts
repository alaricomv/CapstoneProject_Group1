import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent implements OnInit {
  @ViewChild('quantitySelect') quantitySelect: any;
  @ViewChild('quantitySelectBox') quantitySelectBox: any;
  selectedOption: string = 'Buy per dozen';
  product!: Product;
  constructor(
    activatedRoute: ActivatedRoute,
    productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      productService.getProductById(params['id']).subscribe((serverProduct) => {
        console.log('here');
        console.log(serverProduct);
        this.product = serverProduct;
      });
    });
  }

  ngOnInit(): void {}

  addToCart(quantity: string, quantity_box: string):void{
    const selectedQuantity = parseInt(quantity,10);
    const selectedQuantityBox = parseInt(quantity_box,10);
    this.cartService.addToCart(this.product,selectedQuantity,selectedQuantityBox);
    this.router.navigateByUrl('/cart');
  }

  generateNumbers(): number[] {
    const numbers: number[] = [];
    for (let i = 1; i <= this.product.total_pieces; i++) {
      if(i < 10){
        numbers.push(i)
      }
      else if (i > 9 && i % 5 === 0) {
        numbers.push(i);
      }
    }
    return numbers;
  }

  generateNumbersBox(): number[] {
    if(this.product.total_boxes != 0 && this.product.total_boxes){
      const numbers: number[] = [];
      numbers.push(0);
      for (let i = 1; i <= this.product.total_boxes; i++) {
          numbers.push(i);
      }
    return numbers;
    }
    
    return [0];
  }

}
