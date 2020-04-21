import {Component, OnInit, OnDestroy} from '@angular/core';
import {DatabaseService, Vehicle} from 'src/app/database.service';
import {ToastController, AlertController} from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

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
    car_model: any;
    car_brand: any;
    license_plate: any;
    public vehicleForm: FormGroup;

    constructor(public database: DatabaseService, private toastController: ToastController,private alertController:AlertController,private router: Router,public formBuilder: FormBuilder) {
        this.vehicleForm = formBuilder.group({
            car_brand: new FormControl('',Validators.compose([Validators.maxLength(15),Validators.required])),
            car_model: new FormControl('',Validators.compose([Validators.maxLength(20),Validators.required])),
            license_plate: new FormControl('',Validators.compose([Validators.maxLength(7),Validators.pattern('^[A-Za-z]{2}[0-9]{3}[A-Za-z]{2}$'),Validators.required]))
        })

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
        if (this.vehicleForm.controls.car_brand.valid && this.vehicleForm.controls.car_model.valid && this.vehicleForm.controls.license_plate.valid){
            /*this.car_brand = this.vehicleForm.value.car_brand;
            this.car_model = this.vehicleForm.value.car_model;
            this.license_plate = this.vehicleForm.value.license_plate; */
            this.database.addVehicle(this.vehicle['car_brand'],this.vehicle['car_model'], this.vehicle['license_plate']).then(async _ => {
                this.vehicleForm.reset();
                await this.database.getAllVehicles().then(data =>{
                    this.vehicles = data;
                });
            });
            this.showToast();
            this.hideToast();

        }
        else{
            this.compileForm();
        }
       

    }

    async compileForm() {
        const alert = await this.alertController.create({
            header: 'Compila tutti i campi',

            buttons: [{
                text: 'OK',
                cssClass: 'secondary',
                
            },
                {
                    text: 'ANNULLA',
                }
            ]

        });

        await alert.present();
    }

    showToast() {
        this.toast = this.toastController.create({
            message: 'Aggiunto nuovo mezzo!',
            duration: 2000
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
  

