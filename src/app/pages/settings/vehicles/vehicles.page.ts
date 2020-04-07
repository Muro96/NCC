import {Component, OnInit, OnDestroy} from '@angular/core';
import {DatabaseService, Vehicle} from 'src/app/database.service';
import {ToastController, AlertController} from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.page.html',
    styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {

    vehicle = {};
    selectedView = 'list_vehicle';
    vehicles: Vehicle[] = [];
    toast: any;


    constructor(public database: DatabaseService, private toastController: ToastController,private alertController:AlertController,private router: Router) {

    }

    ngOnInit() {
        this.database.getDatabaseState().subscribe(ready => {
            if (ready) {
                this.database.getAllVehicles().then(data => {
                    this.vehicles = data;
                });
            }
        });
    }

    async addVehicle() {
        this.database.addVehicle(this.vehicle['car_brand'],this.vehicle['car_model'], this.vehicle['license_plate']).then(async _ => {
            this.vehicle = {};
            await this.database.getAllVehicles().then(data =>{
                this.vehicles = data;
            });
        });
        this.showToast();
        this.hideToast();

    }

    showToast() {
        this.toast = this.toastController.create({
            message: 'Aggiunto nuovo mezzo!',
            duration: 4000
        }).then((toastData) => {
            toastData.present();
        });
    }

    hideToast() {
        this.toast = this.toastController.dismiss();
    }

    deleteVehicle(vehicle_id:number){
        this.database.deleteVehicles(vehicle_id);
        this.database.getAllVehicles().then(data =>{
            this.vehicles = data;
        });

    }
    
    async cancelVehicle(vehicle_id:number) {
        const alert = await this.alertController.create({
            header: 'SEI SICURO DI VOLER ELIMINARE IL MEZZO?',

            buttons: [{
                text: 'OK',
                cssClass: 'secondary',
                handler: () => {
                    this.deleteVehicle(vehicle_id);
                }
            },
                {
                    text: 'ANNULLA',
                }
            ]

        });

        await alert.present();
    }

    async updateVehicle(vehicle: Vehicle){
        let navigationExtras: NavigationExtras = {
            state: {
                vehicle: vehicle
            }
        };
        this.router.navigate(['settings/vehicles/updatevehicle'], navigationExtras);
    }
}
  

