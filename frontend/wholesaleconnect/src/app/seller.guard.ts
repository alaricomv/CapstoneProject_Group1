import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Check if user is logged in and is a seller
    const user = JSON.parse(localStorage.getItem('User') || '{}');
    const isSeller = user.seller === 1;

    if (isSeller) {
      return true; // Allow access to the route
    } else {
      // Redirect to a different route (e.g., login) if the user is not a seller
      return this.router.createUrlTree(['']); // Redirect to login page
    }
  }
}
