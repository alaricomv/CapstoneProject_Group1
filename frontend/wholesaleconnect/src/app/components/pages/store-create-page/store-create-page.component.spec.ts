import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCreatePageComponent } from './store-create-page.component';

describe('StoreCreatePageComponent', () => {
  let component: StoreCreatePageComponent;
  let fixture: ComponentFixture<StoreCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
