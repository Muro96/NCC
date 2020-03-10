import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-setting',
    templateUrl: 'setting.page.html',
    styleUrls: ['setting.page.scss']
})
export class SettingPage implements OnInit {
    constructor(private router:Router){}

    ngOnInit() {
    }
    agencyInfo(){

    }
    driverInfo(){
        this.router.navigateByUrl('/settings/drivers');
    
    }
    clientsInfo(){
        this.router.navigateByUrl('/settings/clients');

    }
    vehiclesInfo(){
        this.router.navigateByUrl('/settings/vehicles');
    }
    departuresInfo(){
        this.router.navigateByUrl('/settings/departures');

    }
    destinationsInfo(){
        this.router.navigateByUrl('/settings/destinations');

    }
}
