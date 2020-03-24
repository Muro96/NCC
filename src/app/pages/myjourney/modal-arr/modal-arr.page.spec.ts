import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalArrPage } from './modal-arr.page';

describe('ModalArrPage', () => {
  let component: ModalArrPage;
  let fixture: ComponentFixture<ModalArrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalArrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalArrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
