import { Component } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  onEnterPress(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      let searchTerm = (keyboardEvent.target as HTMLInputElement).value;
      if (searchTerm.trim() === '') {
        this.filteredProducts = this.products;
        return;
      }

      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

  onInputChange(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    if (searchTerm.trim() === '') {
      this.filteredProducts = [];
      return;
    }

    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  searchProducts(searchTerm: string) {
    if (searchTerm.trim() === '') {
      this.filteredProducts = [];
      return;
    }

    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  constructor(private productService: ProductService) {
    let productsObservable: Observable<Product[]>;
    productsObservable = productService.getAll();

    productsObservable.subscribe((serverProducts) => {
      console.log('here');
      console.log(serverProducts);
      this.products = serverProducts;
      this.filteredProducts = serverProducts;
    });
  }
}
