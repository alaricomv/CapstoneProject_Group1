import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { User } from '../../../shared/models/User';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../services/orders.service';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrl: './seller-orders.component.css'
})
export class SellerOrdersComponent {

  orders: Order[] = [];
  user!:User;

  constructor(activatedRoute: ActivatedRoute, orderService:OrdersService, private userService:UserService) {

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
}