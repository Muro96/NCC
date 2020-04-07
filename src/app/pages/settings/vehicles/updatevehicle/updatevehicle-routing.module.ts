import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatevehiclePage } from './updatevehicle.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatevehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatevehiclePageRoutingModule {}
