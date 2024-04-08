import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { User } from '../../../shared/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../../services/orders.service';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { IOrderModify } from '../../../shared/interfaces/IOrderModify';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrl: './seller-orders.component.css'
})
export class SellerOrdersComponent {

  orders: Order[] = [];
  user!:User;

  returnUrl= "";

  constructor(private activatedRoute: ActivatedRoute, private orderService:OrdersService, private userService:UserService, private router:Router) {

    let orderObservable:Observable<Order[]>;

    activatedRoute.params.subscribe(params => {
      const storeId = params['id']; // Retrieve id from URL

      userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
        console.log(storeId)
        orderObservable = orderService.getAllOrdersByStoreId(storeId);

        orderObservable.subscribe((serverOrders) => {
          console.log("here");
          console.log(serverOrders);
          this.orders = serverOrders;
        })
      });
    });

    
  }

  changeStatus(){
    const orderRegister: IOrderModify = {
      items: this.orders
    };

    const storeId = this.activatedRoute.snapshot.params['id'];
    this.returnUrl = `/storefront/${storeId}`;

    this.orderService.register(orderRegister).subscribe((updatedOrders) => {
      // Handle success
      console.log("Orders updated successfully:", updatedOrders);
      this.router.navigateByUrl(this.returnUrl);
    }, (error) => {
      // Handle error
      console.error("Error updating orders:", error);
    });
  }
}