import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatabaseService, Driver} from '../../database.service';
import {Platform, NavController, AlertController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage{
   

    options = {day: 'numeric', month: 'long', year: 'numeric'};
    subscribe: any;
    driver = {};
    drivers: Driver[] = [];
    driverLogin: string;

    options_datepicker = {day: 'numeric', month: 'numeric', year: 'numeric'};
    mydate: string = new Date().toLocaleDateString('it-IT', this.options_datepicker);
   
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
    async ionViewDidEnter(){
        let result = await this.database.checkRegister_present(this.mydate);
        if (result==0){
            this.compileDataDays();
        }
        /*else{
            this.database.getRegister(this.mydate).then(data =>{
                this.registers['print_reg'] = data.print_reg;
                this.registers['date'] = data.date;
                this.registers['km_start'] = data.km_start;
                this.registers['km_end'] = data.km_end;
                this.registers['fk_vehicle'] = data.fk_vehicle; 
        

        }); 
    }      */   
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

    servicePaper(){
        this.router.navigate(['/servicepaper']);
    }

    //return name of driver login
    async getDriverLogin() {
        let res = await this.database.getDriverLogin();
        console.log('resemail' + res.email);
        return res.name;

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

    async compileDataDays() {
        const alert = await this.alertController.create({
            header: 'ATTENZIONE',
            subHeader: 'Non hai ancora compilato i dati del giorno!',

            buttons: [{
                text: 'COMPILA',
                cssClass: 'secondary',
                handler: () => {
                    this.navcontroller.navigateRoot('/datadays');
                }
            },
                {
                    text: 'ANNULLA',
                }
            ]

        });

        await alert.present();
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
