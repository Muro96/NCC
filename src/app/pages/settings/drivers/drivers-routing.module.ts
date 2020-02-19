import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DriversPage} from './drivers.page';

const routes: Routes = [
    {
        path: '',
        component: DriversPage
    },
    {
        path: 'updatedriver',
        loadChildren: () => import('./updatedriver/updatedriver.module').then(m => m.UpdatedriverPageModule)
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DriversPageRoutingModule {
}
