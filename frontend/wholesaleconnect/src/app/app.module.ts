import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderexampleComponent } from './components/partials/headerexample/headerexample.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { ProductPageComponent } from './components/pages/product-page/product-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderexampleComponent,
    HomeComponent,
    CartPageComponent,
    ProductPageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
