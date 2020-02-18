import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { DatabaseService, Client } from 'src/app/database.service';
import { LatLng } from 'leaflet';

declare var google;
@Component({
  selector: 'app-myjourney',
  templateUrl: './myjourney.page.html',
  styleUrls: ['./myjourney.page.scss'],
})
export class MyjourneyPage implements OnInit {
    
  selectedView = 'add_journey';
  map:any;
  @ViewChild('map',{static:false}) maq;
  
  time: string = new Date().toLocaleTimeString('it-IT',{hour: '2-digit', minute:'2-digit'});
  options = {day: 'numeric', month: 'numeric', year:'numeric'};


  input_value : any;
  input_value1 : any;
  mydate : string = new Date().toLocaleDateString("it-IT",this.options);

  datePickerObj: any = {};
  datePickerObjPtBr: any = {};
  isDisableDatePicker: false;
  monthsList = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre'
  ];
  weeksList = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'];
  selectedDate: any;
  clients : Client[] = [];

  constructor(public modalCtrl: ModalController,private database: DatabaseService,private platform:Platform) {
  }

   ngOnInit() {
    this.platform.ready().then(() =>{
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.63488, lng:  12.57211},
        zoom: 13,
        mapTypeId: 'roadmap'
      });  
    });
    this.datePickerObj = {
      inputDate: this.mydate,
      dateFormat: 'DD/MM/YYYY',
      fromDate: new Date('01/01/1960'), 
      closeOnSelect: true,
      todayLabel: 'Oggi',
      closeLabel: 'Chiudi',
      titleLabel: 'Conferma Data',
      monthsList: this.monthsList,
      weeksList: this.weeksList,
      momentLocale: 'it-IT',
      yearInAscending: true
    };
    this.database.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.database.getClients().then(data => {
           this.clients = data;
            });
      }
    });
  }
 

  onChangeDate() {
    console.log('onChangeDate date ', this.mydate);
    console.log("timeee"+this.time);
    return this.mydate;
  }

  onClickSubmit() {
    // console.log('onClickSubmit', this.dataForm.value);
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      //componentProps: { objConfig: datePickerObj }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss().then(data => {
      // this.isModalOpen = false;
      console.log(data);
      this.selectedDate = data.data.date;
    });
  }



  getAddressDep(){
    let place: { geometry: { location: { lat: () => void; lng: () => any; }; }; };
    let inputfield = document.getElementById('autocomplete_input_dep').getElementsByTagName('input')[0];
    this.input_value = inputfield.value;
    let autocomplete_dep = new google.maps.places.Autocomplete((inputfield), {
      types:['address'],
      componentRestrictions: {country: 'it'},
    });    
    google.maps.event.addListener(autocomplete_dep ,`place_changed`, () => {
      var place = autocomplete_dep.getPlace();
      var myLatlng = new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());
      console.log("address_Dep"+myLatlng);
      let marker = new google.maps.Marker(
        {
              map: this.map,
              draggable: true,
              animation: google.maps.Animation.DROP,
              position: myLatlng
        });
      return myLatlng;
      
    });
  }
  getAddressArr(){
    let place: { geometry: { location: { lat: () => void; lng: () => any; }; }; };
    let inputfield = document.getElementById('autocomplete_input_arr').getElementsByTagName('input')[0];
    this.input_value1 = inputfield.value;

    let autocomplete_arr = new google.maps.places.Autocomplete((inputfield), {
      types:['address'],
      componentRestrictions: {country: 'it'},
    });    
    google.maps.event.addListener(autocomplete_arr ,`place_changed`, () => {
      place = autocomplete_arr.getPlace();
      var myLatlng = new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());
      console.log("address_Arr"+myLatlng);
      let marker = new google.maps.Marker(
        {
              map: this.map,
              draggable: true,
              animation: google.maps.Animation.DROP,
              position: myLatlng
        });
      console.log("markerrr"+marker);
      return myLatlng;
  });

  
  }

  async initMap(){
    //const pos1: LatLng = this.getAddressArr();
    //const pos2: LatLng = this.getAddressDep();
  }
    
  }




 
