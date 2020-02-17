import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyjourneyPage } from './myjourney.page';

describe('MyjourneyPage', () => {
  let component: MyjourneyPage;
  let fixture: ComponentFixture<MyjourneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyjourneyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyjourneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
