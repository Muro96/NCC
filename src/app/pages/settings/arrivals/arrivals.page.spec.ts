import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArrivalsPage } from './arrivals.page';

describe('ArrivalsPage', () => {
  let component: ArrivalsPage;
  let fixture: ComponentFixture<ArrivalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrivalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArrivalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
