import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { BuffetPreviewSkeletonComponent } from "./buffet-preview-skeleton.component";

describe("BuffetPreviewSkeletonComponent", () => {
  let component: BuffetPreviewSkeletonComponent;
  let fixture: ComponentFixture<BuffetPreviewSkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BuffetPreviewSkeletonComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(BuffetPreviewSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
