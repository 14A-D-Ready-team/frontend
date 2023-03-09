import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TypingOverlayComponent } from "./typing-overlay.component";

describe("TypingOverlayComponent", () => {
  let component: TypingOverlayComponent;
  let fixture: ComponentFixture<TypingOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypingOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
