import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { User } from '../../../shared/models/User';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../../services/orders.service';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css'
})
export class CustomerOrdersComponent {

  orders: Order[] = [];
  user!:User;

  constructor(activatedRoute: ActivatedRoute, orderService:OrdersService, private userService:UserService) {

    let orderObservable:Observable<Order[]>;

      userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
      orderObservable = orderService.getAllOrdersByUserId(this.user.id);

      orderObservable.subscribe((serverOrders) =>{
      console.log("here");
      console.log(serverOrders);
      this.orders = serverOrders;
      })
    })
  }

}
