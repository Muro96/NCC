import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateagencyPageRoutingModule } from './updateagency-routing.module';

import { UpdateagencyPage } from './updateagency.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateagencyPageRoutingModule
  ],
  declarations: [UpdateagencyPage]
})
export class UpdateagencyPageModule {}
