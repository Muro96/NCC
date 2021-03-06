import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { SettingPage } from './setting.page';

const routes: Routes = [
    {
        path: '',
        component: SettingPage,
    },

    {
        path: 'drivers',
        loadChildren: () => import('./drivers/drivers.module').then(m => m.DriversPageModule)
    },
    {
        path: 'vehicles',
        loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesPageModule)
    },
    {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsPageModule)
    },
    {
        path: 'destinations',
        loadChildren: () => import('./destinations/destinations.module').then(m => m.DestinationsPageModule)
    },
    {
        path: 'departures',
        loadChildren: () => import('./departures/departures.module').then(m => m.DeparturesPageModule)
    },
    {
        path: 'agency',
        loadChildren: () => import('./agency/agency.module').then(m => m.AgencyPageModule)

    }


    /* {
         path: 'settings',
         redirectTo: '/settings/drivers',
         pathMatch: 'full'
 
     } */
];


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [SettingPage]
})
export class SettingPageModule {
}
