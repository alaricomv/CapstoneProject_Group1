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
import { PurchasePageComponent } from './components/pages/purchase-page/purchase-page.component';
import { CustomerOrdersComponent } from './components/pages/customer-orders/customer-orders.component';
import { SellerOrdersComponent } from './components/pages/seller-orders/seller-orders.component';
import { EditProductComponent } from './components/pages/edit-product/edit-product.component';
import { SellerGuard } from './seller.guard';
import { NotSellerGuard } from './not-seller.guard';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate:[NotSellerGuard]},
  {path: 'product/:id', component: ProductPageComponent, canActivate:[NotSellerGuard]},
  {path: 'product-edit/:id', component: EditProductComponent, canActivate: [SellerGuard]},
  {path: 'cart', component: CartPageComponent, canActivate:[NotSellerGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'store-create', component: StoreCreatePageComponent, canActivate: [SellerGuard]},
  {path: 'storefront-list', component: StorefrontListComponent, canActivate: [SellerGuard]},
  {path: 'storefront/:id', component: StorefrontPageComponent, canActivate: [SellerGuard]},
  {path: 'product-create/:id', component: ProductCreatePageComponent, canActivate: [SellerGuard]},
  {path: 'purchase', component: PurchasePageComponent, canActivate:[NotSellerGuard]},
  {path: 'customerorders/:id', component: CustomerOrdersComponent, canActivate:[NotSellerGuard]},
  {path: 'sellerorders/:id', component: SellerOrdersComponent, canActivate: [SellerGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
