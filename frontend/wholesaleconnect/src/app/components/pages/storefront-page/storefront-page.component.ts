import { Component } from '@angular/core';
import { Storefront } from '../../../shared/models/store';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-storefront-page',
  templateUrl: './storefront-page.component.html',
  styleUrl: './storefront-page.component.css'
})
export class StorefrontPageComponent {

  storefront!: Storefront;
  constructor(activatedRoute: ActivatedRoute, storeService:StoreService) {
    activatedRoute.params.subscribe((params) => {
      storeService.getStoreById(params['id']).subscribe(serverProduct =>{
        console.log("here");
        console.log(serverProduct);
        this.storefront = serverProduct;
      });
    })

  }

}
