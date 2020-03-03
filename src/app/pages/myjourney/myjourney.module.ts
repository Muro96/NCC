import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MyjourneyPageRoutingModule} from './myjourney-routing.module';

import {MyjourneyPage} from './myjourney.page';
import {Ionic4DatepickerModule} from '@logisticinfotech/ionic4-datepicker';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Ionic4DatepickerModule,
        IonicSelectableModule,
        MyjourneyPageRoutingModule
    ],
    declarations: [MyjourneyPage]
})
export class MyjourneyPageModule {
}
