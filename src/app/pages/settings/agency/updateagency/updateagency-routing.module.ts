import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateagencyPage } from './updateagency.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateagencyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateagencyPageRoutingModule {}
