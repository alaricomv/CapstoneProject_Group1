import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/models/User';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IProductRegister } from '../../../shared/interfaces/IProductRegister';

@Component({
  selector: 'app-product-create-page',
  templateUrl: './product-create-page.component.html',
  styleUrl: './product-create-page.component.css'
})
export class ProductCreatePageComponent {
  selectedFile: File | undefined;
  logoBase64: string | undefined;

  

  registerForm!:FormGroup;
  isSubmitted = false;

  user!:User;

  returnUrl = '';
  constructor(
    private formBuilder:FormBuilder,
    private ProductService:ProductService, 
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private userService:UserService,
    private _sanitizer: DomSanitizer
  ){
    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
    })
  }

  //Gets the file and converts it into a Base64 string
  onFileSelected(event: Event){
    this.selectedFile = (event.target as HTMLInputElement).files?.[0] as File;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.logoBase64 = reader.result as string; 
    };
}


  ngOnInit(): void {
    const storeId = this.activatedRoute.snapshot.params['id']
    this.registerForm = this.formBuilder.group({

      storefront_id: [storeId,[Validators.required]],
      product_key: ['',[Validators.required]],
      name: ['',[Validators.required]],
      description: [''],
      tags: ['', [Validators.required]],
      price_per_dozen: ['',[Validators.required]],
      price_box: [''],
      total_pieces: ['',[Validators.required]],
      pieces_per_box: [''],
      total_boxes: [''],
      imageUrl: ['']
    });

    this.returnUrl=this.activatedRoute.snapshot.queryParams['returnUrl'];
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
    const product:IProductRegister = {
      storefront_id: fv.storefront_id,
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



    this.ProductService.register(product).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}
