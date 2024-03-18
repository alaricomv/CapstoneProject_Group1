import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderexampleComponent } from './components/partials/headerexample/headerexample.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { timeout } from 'rxjs';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { StoreCreatePageComponent } from './components/pages/store-create-page/store-create-page.component';
import { FileUploadComponent } from './components/partials/file-upload/file-upload.component';
import { StorefrontListComponent } from './components/pages/storefront-list/storefront-list.component';

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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
