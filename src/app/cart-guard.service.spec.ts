import { TestBed } from '@angular/core/testing';

import { CartGuardService } from './cart-guard.service';

describe('CartGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartGuardService = TestBed.get(CartGuardService);
    expect(service).toBeTruthy();
  });
});
