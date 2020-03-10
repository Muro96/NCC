import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AddjourneyPageRoutingModule} from './addjourney-routing.module';

import {AddjourneyPage} from './addjourney.page';
import {Ionic4DatepickerModule} from '@logisticinfotech/ionic4-datepicker';
import { IonicSelectableModule } from 'ionic-selectable';
import {ModalDepPage} from '../modal-dep/modal-dep.page'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Ionic4DatepickerModule,
        IonicSelectableModule,
        AddjourneyPageRoutingModule
    ],
    declarations: [AddjourneyPage,ModalDepPage],
    entryComponents: [ModalDepPage]
})
export class AddjourneyPageModule {
}
