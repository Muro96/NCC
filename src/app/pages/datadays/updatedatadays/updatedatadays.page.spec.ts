import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdatedatadaysPage } from './updatedatadays.page';

describe('UpdatedatadaysPage', () => {
  let component: UpdatedatadaysPage;
  let fixture: ComponentFixture<UpdatedatadaysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatedatadaysPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatedatadaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
