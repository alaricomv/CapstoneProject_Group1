import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { StoreCreatePageComponent } from './components/pages/store-create-page/store-create-page.component';
import { StorefrontListComponent } from './components/pages/storefront-list/storefront-list.component';
import { StorefrontPageComponent } from './components/pages/storefront-page/storefront-page.component';
import { ProductCreatePageComponent } from './components/pages/product-create-page/product-create-page.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product/:id', component: ProductPageComponent},
  {path: 'cart', component: CartPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'store-create', component: StoreCreatePageComponent},
  {path: 'storefront-list', component: StorefrontListComponent},
  {path: 'storefront/:id', component: StorefrontPageComponent},
  {path: 'product-create/:id', component: ProductCreatePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
