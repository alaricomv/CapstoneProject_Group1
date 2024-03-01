// app.component.ts

import { Component } from '@angular/core';

interface Product {
  id: string;
  description: string;
  boxes: number;
  units: string;
  amount: number;
  price: number;
}

@Component({
  selector: 'app-cart-root',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  products: Product[] = [
    { id: "SSH-23O29", description: "Product description 1", boxes: 20, units: "Dozen", amount: 100, price: 25.99 },
    { id: "SSH-23V22", description: "Product description 2", boxes: 15, units: "Pieces", amount: 50, price: 15.49 },
    { id: "SSH-23V23", description: "Product description 3", boxes: 30, units: "Tens", amount: 75, price: 10.99 },
    // Add more products as needed
  ];

  calculateTotalPrice(product: Product): number {
    return product.amount * product.price;
  }

  calculateCartTotal(): number {
    return this.products.reduce((total, product) => total + this.calculateTotalPrice(product), 0);
  }

}