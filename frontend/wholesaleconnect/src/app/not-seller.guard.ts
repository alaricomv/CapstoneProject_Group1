import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotSellerGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Check if user is logged in and is not a seller
    const user = JSON.parse(localStorage.getItem('User') || '{}');
    const isNotSeller = user.seller !== 1;

    if (isNotSeller) {
      return true; // Allow access to the route
    } else {
      // Redirect to a different route (e.g., dashboard) if the user is a seller
      return this.router.createUrlTree(['/storefront-list']); // Redirect to dashboard page
    }
  }
}
