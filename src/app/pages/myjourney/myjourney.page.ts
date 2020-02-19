import {Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {ModalController, Platform} from '@ionic/angular';
import {Ionic4DatepickerModalComponent} from '@logisticinfotech/ionic4-datepicker';
import {DatabaseService, Client} from 'src/app/database.service';
import {LatLng} from 'leaflet';
import {Router} from '@angular/router';

declare var google;

@Component({
    selector: 'app-myjourney',
    templateUrl: './myjourney.page.html',
    styleUrls: ['./myjourney.page.scss'],
})
export class MyjourneyPage implements OnInit {

    selectedView = 'add_journey';
    map: any;
    latlng_arr: any;
    latlng_dep: any;
    gmarkers_arr = [];
    gmarkers_dep = [];
    coords = [];
    selected_value: any;
    time: string = new Date().toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'});
    options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    mydate: string = new Date().toLocaleDateString('it-IT', this.options);


    input_value: any;
    input_value1: any;


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
    clients: Client[] = [];

    constructor(public modalCtrl: ModalController, private database: DatabaseService, private platform: Platform, private router: Router) {
    }

    ngOnInit() {
        this.platform.ready().then(() => {
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 45.63488, lng: 12.57211},
                zoom: 4,
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

    //when a date is change on datepicker
    onChangeDate() {
        console.log('onChangeDate date ', this.mydate);
        console.log('timeee' + this.time);
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
            //console.log(data);
            this.selectedDate = data.data.date;
        });
    }


    getAddressDep(): any {
        let place: { geometry: { location: { lat: () => void; lng: () => any; }; }; };
        let inputfield = document.getElementById('autocomplete_input_dep').getElementsByTagName('input')[0];

        if (this.input_value == null || this.input_value == '') {
            for (var i = 0; i < this.gmarkers_dep.length; i++) {
                this.gmarkers_dep[i].setMap(null);
                this.latlng_dep = '';
            }
        }
        let autocomplete_dep = new google.maps.places.Autocomplete((inputfield), {
            types: ['address'],
            componentRestrictions: {country: 'it'},
        });
        google.maps.event.addListener(autocomplete_dep, `place_changed`, () => {
            var place = autocomplete_dep.getPlace();
            this.input_value = inputfield.value;
            this.latlng_dep = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
            let marker = new google.maps.Marker(
                {
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                    position: this.latlng_dep
                });

            google.maps.event.trigger(this.map, 'resize');
            this.map.panTo(marker.getPosition());
            this.map.setZoom(9);

            this.coords.push(this.latlng_dep);
            this.gmarkers_dep.push(marker);


        });
        return this.latlng_dep;
    }

    getAddressArr(): any {
        let place: { geometry: { location: { lat: () => void; lng: () => any; }; }; };
        let inputfield = document.getElementById('autocomplete_input_arr').getElementsByTagName('input')[0];
        console.log('thissss' + this.input_value1);
        if (this.input_value1 == null || this.input_value1 == '') {
            for (var i = 0; i < this.gmarkers_arr.length; i++) {
                this.gmarkers_arr[i].setMap(null);
                this.latlng_arr = '';
            }
        }

        let autocomplete_arr = new google.maps.places.Autocomplete((inputfield), {
            types: ['address'],
            componentRestrictions: {country: 'it'},
        });

        google.maps.event.addListener(autocomplete_arr, `place_changed`, () => {
            place = autocomplete_arr.getPlace();
            this.input_value1 = inputfield.value;
            this.latlng_arr = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
            console.log('this.input_value1' + this.input_value1);

            let marker = new google.maps.Marker({
                map: this.map,
                animation: google.maps.Animation.DROP,
                position: this.latlng_arr
            });

            google.maps.event.trigger(this.map, 'resize');
            this.map.panTo(marker.getPosition());
            this.map.setZoom(9);


            this.gmarkers_arr.push(marker);
            this.coords.push(this.latlng_arr);
            console.log('bbbbb' + this.latlng_arr);
            //return this.latlng_arr;

        });
        console.log('asfghj' + this.latlng_arr);
        return this.latlng_arr;


    }

    async distanceMatrix(): Promise<any> {
        let pos1: LatLng = this.getAddressArr();
        let pos2: LatLng = this.getAddressDep();
        /*console.log("pooooos111111"+pos1);
        console.log("pooooo22222"+pos2); */
        var service = new google.maps.DistanceMatrixService();
        return new Promise((resolve, reject) => {
            let res;
            service.getDistanceMatrix({
                origins: [pos1],
                destinations: [pos2],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: true, //set to false if use highways
                avoidTolls: true // set to false if pay tolls
            }, function callback(response, status) {

                if (status == 'OK') {
                    res = resolve(response);
                    var origins = response.originAddresses;
                    var destinations = response.destinationAddresses;
                    for (var i = 0; i < origins.length; i++) {
                        var results = response.rows[i].elements;
                        for (var j = 0; j < results.length; j++) {
                            var element = results[j];
                            var distance = element.distance.text;
                            //console.log("thisssss"+this.distance);
                            //let time = element.duration;
                            var duration = element.duration.text;
                            //console.log("duration"+this.duration);
                            var from = origins[i];
                            var to = destinations[j];
                        }
                    }

                }
                return res;
            });
        });

        /*google.maps.event.trigger(this.map, "resize");
          this.map.setZoom(7); */
    }

    //get the client_id selected on the ion-select-button
    getClientIdSelected(selectedValue: any) {
        return selectedValue;
    }

    gotoAddClient() {
        this.router.navigate(['/settings/clients']);

    }

    async addArrival() {
        let response = await this.distanceMatrix();
        let latlng = this.getAddressArr();
        //split this address to get all the info to insert
        let address = response.destinationAddresses;
        this.database.addArrival();

    }

}





 
