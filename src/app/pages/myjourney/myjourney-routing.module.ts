import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MyjourneyPage} from './myjourney.page';

const routes: Routes = [
    {
        path: '',
        component: MyjourneyPage
    },
  {
    path: 'addjourney',
    loadChildren: () => import('./addjourney/addjourney.module').then( m => m.AddjourneyPageModule)
  },
  {
    path: 'updatejourney',
    loadChildren: () => import('./updatejourney/updatejourney.module').then( m => m.UpdatejourneyPageModule)
  },
  {
    path: 'modal-dep',
    loadChildren: () => import('./modal-dep/modal-dep.module').then( m => m.ModalDepPageModule)
  },  {
    path: 'modal-arr',
    loadChildren: () => import('./modal-arr/modal-arr.module').then( m => m.ModalArrPageModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyjourneyPageRoutingModule {
}
