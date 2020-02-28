import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatedatadaysPageRoutingModule } from './updatedatadays-routing.module';

import { UpdatedatadaysPage } from './updatedatadays.page';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    UpdatedatadaysPageRoutingModule
  ],
  declarations: [UpdatedatadaysPage]
})
export class UpdatedatadaysPageModule {}
