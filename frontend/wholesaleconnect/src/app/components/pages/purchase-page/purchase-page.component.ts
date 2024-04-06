import { Component } from '@angular/core';
import { User } from '../../../shared/models/User';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { IOrderRegister } from '../../../shared/interfaces/IOrderRegister';

@Component({
  selector: 'app-purchase-page',
  templateUrl: './purchase-page.component.html',
  styleUrl: './purchase-page.component.css'
})
export class PurchasePageComponent {

  user!: User;

  cart!: Cart;

  send_address: string = "";

  returnUrl = '';
  
  constructor(private cartService: CartService, private userService:UserService, private router: Router){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
      this.send_address = this.user.address;
    })
    
  }

  saveAddress(){

  }
  

  pay(){

    this.cart.items.forEach(item => {
      item.address = this.send_address;
    });

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    const order:IOrderRegister = {
      items: this.cart.items
    };

    this.cartService.register(order).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
      setTimeout(() => window.location.reload(), 100);
    })
  }

}
