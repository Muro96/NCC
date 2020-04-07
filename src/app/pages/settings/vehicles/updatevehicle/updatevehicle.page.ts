import { Component, OnInit } from '@angular/core';
import { Vehicle, DatabaseService } from 'src/app/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-updatevehicle',
  templateUrl: './updatevehicle.page.html',
  styleUrls: ['./updatevehicle.page.scss'],
})
export class UpdatevehiclePage implements OnInit {
  vehicle: Vehicle [] = [];
  checked = false;

  constructor(private route: ActivatedRoute, private router: Router, public database: DatabaseService, public toastController: ToastController, public alertController: AlertController) {

    this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
            this.vehicle = this.router.getCurrentNavigation().extras.state.vehicle;
            console.log("dati veicolo passati"+this.vehicle);
        }
    });
  }

  ngOnInit() {
  }


  save() {
    console.log("idddd"+this.vehicle['vehicle_id']);
    this.database.updateVehicle(this.vehicle['vehicle_id'],this.vehicle['car_brand'],this.vehicle['car_model'],this.vehicle['license_plate']);
    this.router.navigateByUrl('/settings/vehicles');

}

}
