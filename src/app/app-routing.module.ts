import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'settings',
        loadChildren: () => import('./pages/settings/setting.module').then(m => m.SettingPageModule)
    },
    {
        path: 'datadays',
        loadChildren: () => import('./pages/datadays/datadays.module').then(m => m.DatadaysPageModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'myjourney',
        loadChildren: () => import('./pages/myjourney/myjourney.module').then(m => m.MyjourneyPageModule)
    },
    /*{
        path: 'departures',
        loadChildren: () => import('./pages/settings/departures/departures.module').then( m => m.DeparturesPageModule)
    }, */


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
