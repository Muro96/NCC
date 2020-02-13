import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import {NativeGeocoder, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.page.html',
  styleUrls: ['./destinations.page.scss'],
})
export class DestinationsPage {
  selectedView = 'add_destination';
  map: Map;
  newMarker: any;
  address: string[];

  constructor(private geolocation: Geolocation) { }

  ionViewDidEnter() {
    this.loadMap();
    }

  loadMap() {
    this.map = new Map('mapId').setView([45.6301900, 12.5681000], 15);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(this.map);



  }

  locatePosition() {

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.newMarker = marker([data.coords.altitude, data.coords.longitude], {draggable:
            true}).addTo(this.map);
      this.newMarker.bindPopup("You are located here!").openPopup();
      console.log("dataaaa" + data.coords.altitude);
      console.log("dataaaa" + data.coords.longitude);

    });
  }

  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }

}
