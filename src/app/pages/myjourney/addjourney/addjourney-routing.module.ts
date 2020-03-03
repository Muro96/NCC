import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AddjourneyPage} from './addjourney.page';


const routes: Routes = [
    {
        path: '',
        component: AddjourneyPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AddjourneyPageRoutingModule {
}
