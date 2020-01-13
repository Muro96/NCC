import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatadaysPageRoutingModule } from './datadays-routing.module';

import { DatadaysPage } from './datadays.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    DatadaysPageRoutingModule
  ],
  declarations: [DatadaysPage]
})
export class DatadaysPageModule {}
