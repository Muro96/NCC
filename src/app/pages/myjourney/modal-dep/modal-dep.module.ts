import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDepPageRoutingModule } from './modal-dep-routing.module';

import { ModalDepPage } from './modal-dep.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDepPageRoutingModule
  ],
  declarations: [ModalDepPage]
})
export class ModalDepPageModule {}
