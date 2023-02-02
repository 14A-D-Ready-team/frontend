import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NumericFilterInputComponent } from "./numeric-filter-input.component";

describe("NumericFilterInputComponent", () => {
  let component: NumericFilterInputComponent;
  let fixture: ComponentFixture<NumericFilterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumericFilterInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumericFilterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
