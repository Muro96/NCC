import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AddjourneyPageRoutingModule} from './addjourney-routing.module';

import {AddjourneyPage} from './addjourney.page';
import {Ionic4DatepickerModule} from '@logisticinfotech/ionic4-datepicker';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Ionic4DatepickerModule,
        AddjourneyPageRoutingModule
    ],
    declarations: [AddjourneyPage]
})
export class AddjourneyPageModule {
}
