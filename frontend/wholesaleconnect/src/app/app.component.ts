import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderexampleComponent } from './components/partials/headerexample/headerexample.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';

@Component({
  selector: 'app-root',

  standalone: true,
  imports: [RouterOutlet,HomeComponent,HeaderexampleComponent,CartPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wholesaleconnect';
}
