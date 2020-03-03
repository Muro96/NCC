import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatejourneyPageRoutingModule } from './updatejourney-routing.module';

import { UpdatejourneyPage } from './updatejourney.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatejourneyPageRoutingModule
  ],
  declarations: [UpdatejourneyPage]
})
export class UpdatejourneyPageModule {}
