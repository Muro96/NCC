import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalDepPage } from './modal-dep.page';

describe('ModalDepPage', () => {
  let component: ModalDepPage;
  let fixture: ComponentFixture<ModalDepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDepPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
