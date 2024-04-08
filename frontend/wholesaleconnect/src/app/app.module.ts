import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderexampleComponent } from './components/partials/headerexample/headerexample.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { timeout } from 'rxjs';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { StoreCreatePageComponent } from './components/pages/store-create-page/store-create-page.component';
import { FileUploadComponent } from './components/partials/file-upload/file-upload.component';
import { StorefrontListComponent } from './components/pages/storefront-list/storefront-list.component';
import { StorefrontPageComponent } from './components/pages/storefront-page/storefront-page.component';
import { ProductCreatePageComponent } from './components/pages/product-create-page/product-create-page.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PurchasePageComponent } from './components/pages/purchase-page/purchase-page.component';
import { CustomerOrdersComponent } from './components/pages/customer-orders/customer-orders.component';
import { SellerOrdersComponent } from './components/pages/seller-orders/seller-orders.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderexampleComponent,
    HomeComponent,
    CartPageComponent,
    ProductPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    StoreCreatePageComponent,
    FileUploadComponent,
    StorefrontListComponent,
    StorefrontPageComponent,
    ProductCreatePageComponent,
    PurchasePageComponent,
    CustomerOrdersComponent,
    SellerOrdersComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass: 'toast-bottom-right',
      newestOnTop:false
    }),
    FormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
