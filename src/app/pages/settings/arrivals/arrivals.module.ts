import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArrivalsPageRoutingModule } from './arrivals-routing.module';

import { ArrivalsPage } from './arrivals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArrivalsPageRoutingModule
  ],
  declarations: [ArrivalsPage]
})
export class ArrivalsPageModule {}
