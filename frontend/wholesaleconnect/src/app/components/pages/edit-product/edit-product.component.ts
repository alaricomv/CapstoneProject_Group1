import { Component } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductModify } from '../../../shared/interfaces/IProductModify';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent{

  selectedFile: File | undefined;
  logoBase64: string | undefined;

  registerForm!:FormGroup;
  isSubmitted = false;

  product!: Product;

  returnUrl = "";
  constructor(
    private formBuilder:FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
  }

  onFileSelected(event: Event){
    this.selectedFile = (event.target as HTMLInputElement).files?.[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.logoBase64 = reader.result as string; 
    };
  }

  ngOnInit(): void {
    const storeId = this.activatedRoute.snapshot.params['id'];


    this.productService.getProductById(storeId).subscribe((serverProduct) => {
      console.log('Product:', serverProduct);
      this.product = serverProduct;

      const productId = this.product.id;
      

      if(this.product.imageUrl != null){
        this.logoBase64 = this.product.imageUrl;
      }

      if(this.product){
    
    // Assigning default values from the user object
    this.registerForm = this.formBuilder.group({
        id: [productId, [Validators.required]],
        product_key: [this.product.product_key || '', [Validators.required]],
        name: [this.product.name || '', [Validators.required]],
        description: [this.product.description || ''],
        tags: [this.product.tags || '', [Validators.required]],
        price_per_dozen: [this.product.price_per_dozen || '', [Validators.required]],
        price_box: [this.product.price_box || ''],
        total_pieces: [this.product.total_pieces || '', [Validators.required]],
        pieces_per_box: [this.product.pieces_per_box || ''],
        total_boxes: [this.product.total_boxes || ''],
        imageUrl: [this.product.imageUrl || '']
    });

    this.returnUrl = "/storefront-list"

  }
  });
  }


  get fc(){
    return this.registerForm.controls;
  }

  submit(){

    console.log("enters");
    this.isSubmitted = true;
    console.log(this.registerForm);
    if (this.registerForm.invalid) return;

    const fv = this.registerForm.value;
    const product:IProductModify = {
      id: fv.id,
      product_key: fv.product_key,
      name: fv.name,
      description:fv.description,
      tags: fv.tags,
      price_per_dozen: fv.price_per_dozen,
      price_box: fv.price_box,
      total_pieces: fv.total_pieces,
      pieces_per_box: fv.pieces_per_box,
      total_boxes: fv.total_boxes,
      imageUrl: this.logoBase64
    };



    this.productService.editProduct(product).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

  deleteProduct(){
    const productId = this.activatedRoute.snapshot.params['id'];

    this.productService.deleteProductById(productId).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}






