import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordsMatchValidator } from '../../../shared/validators/password_match_validator';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit{

  registerForm!:FormGroup;
  isSubmitted = false;

  returnUrl = '';
  constructor(
    private formBuilder:FormBuilder,
    private UserService:UserService, 
    private activatedRoute:ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['',[Validators.required, Validators.minLength(5)]],
      last_name: ['',[Validators.required, Validators.minLength(5)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5)]],
      address: ['',[Validators.required, Validators.minLength(5)]],
      phone_number: [''],
      seller: ['',[Validators.required]]
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
    const user:IUserRegister = {
      first_name: fv.first_name,
      last_name: fv.last_name,
      email: fv.email,
      password:fv.password,
      address: fv.address,
      phone_number: fv.phone_number,
      seller: fv.seller
    };



    this.UserService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

 

}
