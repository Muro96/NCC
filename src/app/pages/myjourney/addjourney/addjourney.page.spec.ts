import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AddjourneyPage} from './addjourney.page';

describe('AddjourneyPage', () => {
    let component: AddjourneyPage;
    let fixture: ComponentFixture<AddjourneyPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddjourneyPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(AddjourneyPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

