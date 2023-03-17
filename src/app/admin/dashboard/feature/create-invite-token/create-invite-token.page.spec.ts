import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { CreateInviteTokenPage } from "./create-invite-token.page";

describe("CreateInviteTokenComponent", () => {
  let component: CreateInviteTokenPage;
  let fixture: ComponentFixture<CreateInviteTokenPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CreateInviteTokenPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateInviteTokenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
