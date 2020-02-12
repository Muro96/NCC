import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.page.html',
  styleUrls: ['./destinations.page.scss'],
})
export class DestinationsPage{
  selectedView = 'add_destination';
  map : Map;
  newMarker:any;
  address:string[];

  constructor() { }

  ionViewDidEnter() {

    this.map = new Map('mapId').setView([45.6301900,12.5681000], 15);
    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(this.map);
    

  
  
  }  

  locatePosition(){
    this.map.locate({setView:false}).on("locationfound", (e: any)=> {
      this.newMarker = marker([e.latitude,e.longitude]).addTo(this.map);
      console.log("newMarker"+this.newMarker);
      
      this.newMarker.bindPopup("You are located here!").openPopup();
     
      this.newMarker.on("dragend", ()=> {
        const position = this.newMarker.getLatLng();
       }); 
    });
  }
  


  /** Remove map when we have multiple map object */
  ionViewWillLeave() {
    this.map.remove();
  }

}
