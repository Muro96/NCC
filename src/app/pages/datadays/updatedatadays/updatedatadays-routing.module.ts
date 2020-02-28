import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatedatadaysPage } from './updatedatadays.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatedatadaysPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatedatadaysPageRoutingModule {}
