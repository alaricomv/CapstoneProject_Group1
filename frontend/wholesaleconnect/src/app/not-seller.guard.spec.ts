import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notSellerGuard } from './not-seller.guard';

describe('notSellerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notSellerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
