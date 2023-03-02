import { ComponentFixture, TestBed } from "@angular/core/testing";

<<<<<<<< HEAD:src/app/admin/products/feature/products-list/products-list.component.spec.ts
import { ProductsListPage } from "./products-list.page";

describe("ProductsListComponent", () => {
  let component: ProductsListPage;
  let fixture: ComponentFixture<ProductsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListPage);
========
import { SelectorInputComponent } from "./selector-input.component";

describe("SelectorInputComponent", () => {
  let component: SelectorInputComponent;
  let fixture: ComponentFixture<SelectorInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorInputComponent);
>>>>>>>> master:src/app/shared/inputs/ui/ionic/selector-input/selector-input.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
