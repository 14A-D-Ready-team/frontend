import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterMenuComponent } from './product-filter-menu.component';

describe('ProductFilterMenuComponent', () => {
  let component: ProductFilterMenuComponent;
  let fixture: ComponentFixture<ProductFilterMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProductFilterMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFilterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
