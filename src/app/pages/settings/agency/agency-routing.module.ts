import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgencyPage } from './agency.page';

const routes: Routes = [
  {
    path: '',
    component: AgencyPage
  },
  {
    path: 'detailagency',
    loadChildren: () => import('./detailagency/detailagency.module').then( m => m.DetailagencyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgencyPageRoutingModule {}
