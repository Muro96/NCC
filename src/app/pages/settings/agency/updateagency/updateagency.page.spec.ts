import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateagencyPage } from './updateagency.page';

describe('UpdateagencyPage', () => {
  let component: UpdateagencyPage;
  let fixture: ComponentFixture<UpdateagencyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateagencyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateagencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
