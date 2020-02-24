import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatabaseService, Driver} from '../../database.service';
import {Platform, NavController, AlertController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    options = {day: 'numeric', month: 'long', year: 'numeric'};
    subscribe: any;
    driver = {};
    drivers: Driver[] = [];
    driverLogin: string;


    public currentDate: string = new Date().toLocaleDateString('it-IT', this.options);

    constructor(private router: Router, private database: DatabaseService, public platform: Platform, private alertController: AlertController, public navcontroller: NavController) {
        this.database.getDatabaseState().subscribe(async ready => {
            if (ready) {
                this.database.getDrivers().subscribe(driver => {
                    this.drivers = driver;
                });
                await this.getDriverLogin().then(res => {
                    this.driverLogin = res;
                });
            }

        });
    }

    pageSettings() {
        this.router.navigate(['/settings/drivers']);
    }

    dayDates() {
        this.router.navigate(['/datadays']);

    }

    myJourney() {
        this.router.navigate(['/myjourney']);
    }

    //return email of driver login
    async getDriverLogin() {
        let res = await this.database.getDriverLogin();
        console.log('resemail' + res.email);
        return res.email;

    }

    async getDriverId() {
        let res = await this.database.getDriverLogin();
        console.log('driver_id' + res.driver_id);
        return res.driver_id;

    }

    async logout() {
        let res = await this.getDriverId();
        console.log('result user login' + res);
        this.database.updateLogut(res);
    }


    async doLogout() {
        const alert = await this.alertController.create({
            header: 'SEI SICURO DI VOLER USCIRE?',

            buttons: [{
                text: 'OK',
                cssClass: 'secondary',
                handler: () => {
                    this.logout();
                    this.navcontroller.navigateRoot('/login');
                }
            },
                {
                    text: 'ANNULLA',
                }
            ]

        });

        await alert.present();
    }

}
