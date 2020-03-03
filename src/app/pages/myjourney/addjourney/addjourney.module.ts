import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AddjourneyPageRoutingModule} from './addjourney-routing.module';

import {AddjourneyPage} from './addjourney.page';
import {Ionic4DatepickerModule} from '@logisticinfotech/ionic4-datepicker';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Ionic4DatepickerModule,
        IonicSelectableModule,
        AddjourneyPageRoutingModule
    ],
    declarations: [AddjourneyPage]
})
export class AddjourneyPageModule {
}
