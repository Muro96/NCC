import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdatejourneyPage } from './updatejourney.page';

describe('UpdatejourneyPage', () => {
  let component: UpdatejourneyPage;
  let fixture: ComponentFixture<UpdatejourneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatejourneyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatejourneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
