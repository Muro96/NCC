import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalArrPageRoutingModule } from './modal-arr-routing.module';

import { ModalArrPage } from './modal-arr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalArrPageRoutingModule
  ],
  declarations: [ModalArrPage]
})
export class ModalArrPageModule {}
