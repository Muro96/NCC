import { Component, OnInit } from '@angular/core';
import { Departure, DatabaseService } from 'src/app/database.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-departures',
  templateUrl: './departures.page.html',
  styleUrls: ['./departures.page.scss'],
})
export class DeparturesPage implements OnInit {
  selectedView = 'list_destination';
    departure = {};
    departures: Departure[] = [];

    /*
    @ViewChild('map', {static: true}) mapElement: ElementRef;
    map: any;
    address: string;

    constructor(
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder) {
    } */

    constructor(public database: DatabaseService, private toastController: ToastController,private alertController:AlertController) {
    }


    ngOnInit() {
        this.database.getDatabaseState().subscribe(ready => {
            if (ready) {
                this.database.getDepartures().then(data => {
                    this.departures = data;
                });
            }
        });
        //this.loadMap();
    }
    /*async addArrival(){
     this.database.addDestination(this.arrival['name_arr'],this.arrival['city_arr'],this.arrival['province_arr'],this.arrival['address_arr']).then(async _ => {
        this.arrival = {};
        await this.database.getArrivals().then(data => {
            this.arrivals = data;
            });
        });
    } */
}
