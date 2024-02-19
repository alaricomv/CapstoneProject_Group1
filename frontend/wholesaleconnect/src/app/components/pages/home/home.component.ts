import { Component } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  products: Product[] = [];

  constructor(private productService:ProductService){
    this.products = productService.getAll();
  }


}
