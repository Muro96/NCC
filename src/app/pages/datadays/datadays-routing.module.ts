import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DatadaysPage} from './datadays.page';

const routes: Routes = [
    {
        path: '',
        component: DatadaysPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DatadaysPageRoutingModule {
}
