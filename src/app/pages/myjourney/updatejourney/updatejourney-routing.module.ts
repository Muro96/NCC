import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatejourneyPage } from './updatejourney.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatejourneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatejourneyPageRoutingModule {}
