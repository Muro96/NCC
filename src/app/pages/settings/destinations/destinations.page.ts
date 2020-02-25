import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';

import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
import {DatabaseService, Arrival} from 'src/app/database.service';
import { ToastController, AlertController } from '@ionic/angular';

//declare var google: { maps: { LatLng: new (arg0: number, arg1: number) => any; MapTypeId: { ROADMAP: any; }; Map: new (arg0: any, arg1: { center: any; zoom: number; mapTypeId: any; }) => any; }; };

@Component({
    selector: 'app-destinations',
    templateUrl: './destinations.page.html',
    styleUrls: ['./destinations.page.scss'],
})
export class DestinationsPage implements OnInit {
    selectedView = 'list_destination';
    arrival = {};
    arrivals: Arrival[] = [];

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
                this.database.getArrivals().then(data => {
                    this.arrivals = data;
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


   /* loadMap() {
        this.geolocation.getCurrentPosition().then((resp) => {
            let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

            this.map.addListener('tilesloaded', () => {
                console.log('accuracy', this.map);
                this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng());
            });

        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    getAddressFromCoords(lattitude, longitude) {
        console.log('getAddressFromCoords ' + lattitude + ' ' + longitude);
        let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };

        this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
            .then((result: NativeGeocoderResult[]) => {
                this.address = '';
                let responseAddress = [];
                for (let [key, value] of Object.entries(result[0])) {
                    if (value.length > 0) {
                        responseAddress.push(value);
                    }

                }
                responseAddress.reverse();
                for (let value of responseAddress) {
                    this.address += value + ', ';
                }
                this.address = this.address.slice(0, -2);
            })
            .catch((error: any) => {
                this.address = 'Address Not Available!';
            });
 
    } */


}
