import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendPasswordResetDesktopPage } from './send-password-reset-desktop.page';

describe('SendPasswordResetDesktopPage', () => {
  let component: SendPasswordResetDesktopPage;
  let fixture: ComponentFixture<SendPasswordResetDesktopPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SendPasswordResetDesktopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendPasswordResetDesktopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
