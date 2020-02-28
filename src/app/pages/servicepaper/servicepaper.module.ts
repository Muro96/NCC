import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicepaperPageRoutingModule } from './servicepaper-routing.module';

import { ServicepaperPage } from './servicepaper.page';
import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicepaperPageRoutingModule
  ],
  declarations: [ServicepaperPage],
  providers: [File,FileOpener]
})
export class ServicepaperPageModule {}
