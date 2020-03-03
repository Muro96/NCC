import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateclientPage } from './updateclient.page';

describe('UpdateclientPage', () => {
  let component: UpdateclientPage;
  let fixture: ComponentFixture<UpdateclientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateclientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateclientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
