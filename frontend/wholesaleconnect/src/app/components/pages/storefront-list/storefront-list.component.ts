import { Component } from '@angular/core';
import { Storefront } from '../../../shared/models/store';
import { StoreService } from '../../../services/store.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'app-storefront-list',
  templateUrl: './storefront-list.component.html',
  styleUrl: './storefront-list.component.css'
})
export class StorefrontListComponent {

  stores: Storefront[] = [];
  user!:User;

  constructor(activatedRoute: ActivatedRoute, storeService:StoreService, private userService:UserService) {

    let storeObservable:Observable<Storefront[]>;

    

    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
      storeObservable = storeService.getAllBySellerId(this.user.id);

      storeObservable.subscribe((serverProducts) =>{
      console.log("here");
      console.log(serverProducts);
      this.stores = serverProducts;
      })
    })

    

  }





}
