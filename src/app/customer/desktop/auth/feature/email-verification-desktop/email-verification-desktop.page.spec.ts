import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { EmailVerificationDesktopPage } from "./email-verification-desktop.page";

describe("EmailVerificationDesktopPage", () => {
  let component: EmailVerificationDesktopPage;
  let fixture: ComponentFixture<EmailVerificationDesktopPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmailVerificationDesktopPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailVerificationDesktopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
