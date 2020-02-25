import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ArrivalsPage} from './arrivals.page';

const routes: Routes = [
    {
        path: '',
        component: ArrivalsPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ArrivalsPageRoutingModule {
}
