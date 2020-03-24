import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        path: 'drivers',
        loadChildren: () => import('./pages/settings/drivers/drivers.module').then(m => m.DriversPageModule)
    },
    {
        path: 'clients',
        loadChildren: () => import('./pages/settings/clients/clients.module').then(m => m.ClientsPageModule)
    },
    {
        path: 'vehicles',
        loadChildren: () => import('./pages/settings/vehicles/vehicles.module').then(m => m.VehiclesPageModule)
    },
    {
        path: 'departures',
        loadChildren: () => import('./pages/settings/departures/departures.module').then(m => m.DeparturesPageModule)
    },
    {
        path: 'destinations',
        loadChildren: () => import('./pages/settings/destinations/destinations.module').then(m => m.DestinationsPageModule)
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
    {
        path: 'servicepaper',
        loadChildren: () => import('./pages/servicepaper/servicepaper.module').then(m => m.ServicepaperPageModule)
    },
    {
        path: 'modal-dep',
        loadChildren: () => import('./pages/myjourney/modal-dep/modal-dep.module').then(m => m.ModalDepPageModule)
    },
    {
        path: 'modal-arr',
        loadChildren: () => import('./pages/myjourney/modal-arr/modal-arr.module').then(m => m.ModalArrPageModule)
    },
    {
        path: 'agency',
        loadChildren: () => import('./pages/settings/agency/agency.module').then(m => m.AgencyPageModule)
    },


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
