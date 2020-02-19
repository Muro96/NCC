import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UpdatedriverPage} from './updatedriver.page';

const routes: Routes = [
    {
        path: '',
        component: UpdatedriverPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UpdatedriverPageRoutingModule {
}
