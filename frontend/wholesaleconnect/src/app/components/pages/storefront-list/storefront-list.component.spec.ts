import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorefrontListComponent } from './storefront-list.component';

describe('StorefrontListComponent', () => {
  let component: StorefrontListComponent;
  let fixture: ComponentFixture<StorefrontListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorefrontListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StorefrontListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
