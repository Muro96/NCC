import { Component, OnInit } from '@angular/core';
import { DatabaseService, Vehicle } from 'src/app/database.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit {
  vehicle = {};
  selectedView = 'list_vehicle';
  vehicles : Vehicle[] =  [];
  toast : any;


  constructor(public database: DatabaseService,private toastController: ToastController) {
    this.database.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.database.getVehicles().subscribe(data => {
          this.vehicles = data;
        });
    
      }
    });
  }

  ngOnInit() {
    
  }

  addVehicle(){
    this.database.addVehicle(this.vehicle['car_model'],this.vehicle['license_plate']).then(_ => {
      this.vehicle = {};
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

  hideToast(){
    this.toast = this.toastController.dismiss();
  }

}
  

