import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalArrPage } from './modal-arr.page';

const routes: Routes = [
  {
    path: '',
    component: ModalArrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalArrPageRoutingModule {}
