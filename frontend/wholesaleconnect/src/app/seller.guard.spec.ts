import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SellerGuard } from './seller.guard';

describe('SellerGuard', () => {
  let guard: SellerGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SellerGuard); // Create an instance of SellerGuard
    router = TestBed.inject(Router); // Inject Router for spy
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access if user is a seller', () => {
    const user = { seller: 1 }; // Mock user object
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user)); // Mock localStorage

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    const canActivate = guard.canActivate(route, state);

    expect(canActivate).toBeTrue();
  });

  it('should redirect if user is not a seller', () => {
    const user = { seller: 0 }; // Mock user object
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(user)); // Mock localStorage
    spyOn(router, 'createUrlTree'); // Spy on createUrlTree method

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    guard.canActivate(route, state);

    expect(router.createUrlTree).toHaveBeenCalledWith(['/dashboard']);
  });
});
