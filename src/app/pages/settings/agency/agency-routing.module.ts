import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgencyPage } from './agency.page';

const routes: Routes = [
  {
    path: '',
    component: AgencyPage
  },
  {
    path: 'updateagency',
    loadChildren: () => import('./updateagency/updateagency.module').then( m => m.UpdateagencyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyPageRoutingModule {}
