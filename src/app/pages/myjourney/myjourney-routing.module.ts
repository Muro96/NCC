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
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyjourneyPageRoutingModule {
}
