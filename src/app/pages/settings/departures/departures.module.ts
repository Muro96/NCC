import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeparturesPageRoutingModule } from './departures-routing.module';

import { DeparturesPage } from './departures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeparturesPageRoutingModule
  ],
  declarations: [DeparturesPage]
})
export class DeparturesPageModule {}
