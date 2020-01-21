import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailagencyPageRoutingModule } from './detailagency-routing.module';

import { DetailagencyPage } from './detailagency.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailagencyPageRoutingModule
  ],
  declarations: [DetailagencyPage]
})
export class DetailagencyPageModule {}
