import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryDisplaySkeletonComponent } from './category-display-skeleton.component';

describe('CategoryDisplaySkeletonComponent', () => {
  let component: CategoryDisplaySkeletonComponent;
  let fixture: ComponentFixture<CategoryDisplaySkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDisplaySkeletonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryDisplaySkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
