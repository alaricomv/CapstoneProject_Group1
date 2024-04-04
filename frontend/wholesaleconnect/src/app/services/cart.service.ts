import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../shared/models/product';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(product:Product, quantity:number, quantity_box: number):void{
    let cartItem = this.cart.items.find(item => item.product.id === product.id);

    if (cartItem){
      console.log("enters");
      console.log(cartItem.quantity);
      console.log(quantity);
      cartItem.quantity += quantity;
      cartItem.quantity_box += quantity_box;
      
      this.updateCartInLocalStorage();
    }

    else{

    this.cart.items.push(new CartItem(product))
    this.cart.items[this.cart.items.length - 1].quantity = quantity;
    this.cart.items[this.cart.items.length - 1].quantity_box = quantity_box;
    this.setCartToLocalStorage();
    }
  }

  removeFromCart(productId: number):void{
    this.cart.items = this.cart.items.filter(item => item.product.id !== productId);
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
  }

  getCartObservable(): Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private updateCartInLocalStorage(): void {
    // Update total count based on the modified cart items
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => {
      return prevSum + currentItem.quantity;
    }, 0);
  
    this.cart.totalCountBoxes = this.cart.items.reduce((prevSum, currentItem) => {
      return prevSum + currentItem.quantity_box;
    }, 0);
  
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
  
    this.cartSubject.next(this.cart);
  }

  private setCartToLocalStorage():void{
    this.cart.totalCount = 0;
  this.cart.totalCountBoxes = 0;
  
    // Calculate total count based on the quantity of each item
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => {
      return prevSum + currentItem.quantity;
    }, 0);

    this.cart.totalCountBoxes = this.cart.items.reduce((prevSum, currentItem) => {
      return prevSum + currentItem.quantity_box;
    }, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    this.cartSubject.next(this.cart);
    }

    private getCartFromLocalStorage():Cart{
      const cartJson = localStorage.getItem('Cart');
      return cartJson? JSON.parse(cartJson): new Cart()
    }
}
