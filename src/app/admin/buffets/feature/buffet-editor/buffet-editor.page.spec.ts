import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

<<<<<<<< HEAD:src/app/admin/buffets/feature/buffet-editor/buffet-editor.page.spec.ts
import { BuffetEditorPage } from "./buffet-editor.page";

describe("BuffetEditorComponent", () => {
  let component: BuffetEditorPage;
  let fixture: ComponentFixture<BuffetEditorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BuffetEditorPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuffetEditorPage);
========
import { ProductPreviewComponent } from "./product-preview.component";

describe("ProductPreviewComponent", () => {
  let component: ProductPreviewComponent;
  let fixture: ComponentFixture<ProductPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPreviewComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPreviewComponent);
>>>>>>>> master:src/app/admin/products/ui/product-preview/product-preview.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
