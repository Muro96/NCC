import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDepPage } from './modal-dep.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDepPageRoutingModule {}
