import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyjourneyPage } from './myjourney.page';

const routes: Routes = [
  {
    path: '',
    component: MyjourneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyjourneyPageRoutingModule {}
