import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderexampleComponent } from './headerexample.component';

describe('HeaderexampleComponent', () => {
  let component: HeaderexampleComponent;
  let fixture: ComponentFixture<HeaderexampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderexampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
