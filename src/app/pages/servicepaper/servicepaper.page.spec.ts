import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicepaperPage } from './servicepaper.page';

describe('ServicepaperPage', () => {
  let component: ServicepaperPage;
  let fixture: ComponentFixture<ServicepaperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicepaperPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicepaperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
