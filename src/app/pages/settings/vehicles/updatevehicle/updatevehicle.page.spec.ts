import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdatevehiclePage } from './updatevehicle.page';

describe('UpdatevehiclePage', () => {
  let component: UpdatevehiclePage;
  let fixture: ComponentFixture<UpdatevehiclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatevehiclePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatevehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
