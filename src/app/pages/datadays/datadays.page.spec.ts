import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DatadaysPage } from './datadays.page';

describe('DatadaysPage', () => {
  let component: DatadaysPage;
  let fixture: ComponentFixture<DatadaysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatadaysPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DatadaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
