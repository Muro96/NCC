import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {VehiclesPage} from './vehicles.page';

const routes: Routes = [
    {
        path: '',
        component: VehiclesPage
    },  {
    path: 'updatevehicle',
    loadChildren: () => import('./updatevehicle/updatevehicle.module').then( m => m.UpdatevehiclePageModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VehiclesPageRoutingModule {
}
