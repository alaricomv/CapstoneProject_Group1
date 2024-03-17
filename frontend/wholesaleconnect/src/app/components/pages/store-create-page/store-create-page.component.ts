import { Component } from '@angular/core';
import { IStoreRegister } from '../../../shared/interfaces/IStoreRegister';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { StoreService } from '../../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-store-create-page',
  templateUrl: './store-create-page.component.html',
  styleUrl: './store-create-page.component.css'
})
export class StoreCreatePageComponent {

  registerForm!:FormGroup;
  isSubmitted = false;

  user!:User;

  returnUrl = '';
  constructor(
    private formBuilder:FormBuilder,
    private StoreService:StoreService, 
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private userService:UserService
  ){
    userService.userObservable.subscribe((newUser) =>{
      this.user = newUser;
    })
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(5)]],
      seller_id: [this.user.id,[Validators.required]],
      logo: [''],
      description: [''],
      tags: [''],
      address: ['']
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
    const store:IStoreRegister = {
      name: fv.name,
      seller_id: fv.seller_id,
      logo: fv.logo,
      description:fv.description,
      tags: fv.tags,
      address: fv.address
    };



    this.StoreService.register(store).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }
}
