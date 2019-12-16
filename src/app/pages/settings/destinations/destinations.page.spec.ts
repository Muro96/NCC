import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DestinationsPage } from './destinations.page';

describe('DestinationsPage', () => {
  let component: DestinationsPage;
  let fixture: ComponentFixture<DestinationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
