import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
declare var google;
@Component({
  selector: 'app-myjourney',
  templateUrl: './myjourney.page.html',
  styleUrls: ['./myjourney.page.scss'],
})
export class MyjourneyPage implements OnInit {
    
  selectedView = 'list_journey';
  autocomplete_dep : any;
  autocomplete_arr : any;
  time: string = new Date().toLocaleTimeString('it-IT',{hour: '2-digit', minute:'2-digit'});

  options = {day: 'numeric', month: 'numeric', year:'numeric'};
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
  selectedDate;

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
    this.datePickerObj = {

      inputDate: this.mydate,
    
      dateFormat: 'DD/MM/YYYY',
      fromDate: new Date('01/01/1960'), // default null
      // toDate: new Date('2018-12-28'), // default null
      // showTodayButton: true, // default true
       closeOnSelect: true, // default false
      // disableWeekDays: [4], // default []
      // mondayFirst: false, // default false
      // setLabel: 'Conferma',  // default 'Set'
       todayLabel: 'Oggi', // default 'Today'
       closeLabel: 'Chiudi', // default 'Close'
      // disabledDates: disabledDates, // default []
      titleLabel: 'Conferma Data', // default null
       monthsList: this.monthsList,
       weeksList: this.weeksList,
       momentLocale: 'it-IT',
      yearInAscending: true
    };
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
    //this.initMap();
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 46.00, lng: 12.00},
      zoom: 13,
      mapTypeId: 'roadmap'
  });
    let inputfield = document.getElementById('autocomplete_input_dep').getElementsByTagName('input')[0];
    this.autocomplete_dep = new google.maps.places.Autocomplete((inputfield), {
      types:['address'],
      componentRestrictions: {country: 'it'},
    });    
    google.maps.event.addListener(this.autocomplete_dep ,`place_changed`, () => {
      var place = this.autocomplete_dep.getPlace();
      console.log(place);
    });
  }
  getAddressArr(){
    //this.initMap();
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 46.00, lng: 12.00},
      zoom: 13,
      mapTypeId: 'roadmap'
      });
    let inputfield = document.getElementById('autocomplete_input_arr').getElementsByTagName('input')[0];
    this.autocomplete_arr = new google.maps.places.Autocomplete((inputfield), {
      types:['address'],
      componentRestrictions: {country: 'it'},
    });    
    google.maps.event.addListener(this.autocomplete_arr ,`place_changed`, () => {
      var place = this.autocomplete_arr.getPlace();
      console.log(place);
      var markers = [];
      var bounds = new google.maps.LatLngBounds();
      place.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));
      });  
  });
}
}

 
