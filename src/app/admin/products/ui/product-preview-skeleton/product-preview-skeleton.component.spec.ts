import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { ProductPreviewSkeletonComponent } from "./product-preview-skeleton.component";

describe("ProductPreviewSkeletonComponent", () => {
  let component: ProductPreviewSkeletonComponent;
  let fixture: ComponentFixture<ProductPreviewSkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPreviewSkeletonComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPreviewSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
