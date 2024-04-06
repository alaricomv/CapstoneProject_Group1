// app.component.ts

import { Component } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/CartItem';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';

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

  user!: User;

  cart!: Cart;
  constructor(private cartService: CartService, private userService:UserService){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
    })
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

  proceedToPay(){
    this.cart.items.forEach(item => {
      item.user_id = this.user.id;
    });

    const cartJson = JSON.stringify(this.cart);
  localStorage.setItem('Cart', cartJson);


  }


}