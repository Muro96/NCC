import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UpdatedriverPageRoutingModule} from './updatedriver-routing.module';

import {UpdatedriverPage} from './updatedriver.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UpdatedriverPageRoutingModule
    ],
    declarations: [UpdatedriverPage]
})
export class UpdatedriverPageModule {
}
