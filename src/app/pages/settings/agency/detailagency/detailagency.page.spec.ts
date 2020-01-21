import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailagencyPage } from './detailagency.page';

describe('DetailagencyPage', () => {
  let component: DetailagencyPage;
  let fixture: ComponentFixture<DetailagencyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailagencyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailagencyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
