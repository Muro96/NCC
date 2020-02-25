import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeparturesPage } from './departures.page';

describe('DeparturesPage', () => {
  let component: DeparturesPage;
  let fixture: ComponentFixture<DeparturesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeparturesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeparturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
