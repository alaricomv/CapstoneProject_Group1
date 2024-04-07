// app.component.ts

import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/CartItem';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

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
export class CartPageComponent implements OnInit{

  user!: User;

  cart!: Cart;
  constructor(private cartService: CartService, private userService:UserService, private router: Router){

    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
    })
  }

  ngOnInit() {
    this.router.navigate(['/dummy']).then(() => {
      this.router.navigate(['/cart']);
    });
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.product.id);
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cart.items.forEach(item => {
      totalPrice += item.quantity * item.product.price_per_dozen;
    });
    return totalPrice;
  }

  getTotalPriceBox() {
    let totalPrice = 0;
    this.cart.items.forEach(item => {
      totalPrice += item.quantity_box * (item.product.price_box || 0) * (item.product.pieces_per_box || 0);
    });
    return totalPrice;
  }

  calculateItemTotalPrice(item: CartItem): number {
    return item.quantity * item.product.price_per_dozen
      + (item.product.price_box || 0) * (item.product.pieces_per_box || 0) * (item.quantity_box || 0);
  }

  proceedToPay(){
    this.cart.items.forEach(item => {
      item.user_id = this.user.id;
      item.price = this.calculateItemTotalPrice(item);
    });

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    this.router.navigate(['/purchase']);


  }


}