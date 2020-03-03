import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ClientsPage} from './clients.page';

const routes: Routes = [
    {
        path: '',
        component: ClientsPage
    },
  {
    path: 'updateclient',
    loadChildren: () => import('./updateclient/updateclient.module').then( m => m.UpdateclientPageModule)
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientsPageRoutingModule {
}
