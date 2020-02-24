import {Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {ModalController, Platform, AlertController, ToastController} from '@ionic/angular';
import {Ionic4DatepickerModalComponent} from '@logisticinfotech/ionic4-datepicker';
import {DatabaseService, Client, Travel, Departure, Arrival} from 'src/app/database.service';
import {LatLng} from 'leaflet';
import {Router} from '@angular/router';

//declare var google;

@Component({
    selector: 'app-myjourney',
    templateUrl: './myjourney.page.html',
    styleUrls: ['./myjourney.page.scss'],
})
export class MyjourneyPage implements OnInit {

    selectedView = 'add_journey';
    travel = {};
    travels: Travel[] = [];

    departure = {};
    departures: Departure[] = [];

    arrival = {};
    arrivals: Arrival [] = [];

    client_id_select: any;


    map: any;
    latlng_arr: any;
    latlng_dep: any;
    gmarkers_arr = [];
    gmarkers_dep = [];
    coords = [];

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

    constructor(public modalCtrl: ModalController, private database: DatabaseService, private platform: Platform, private router: Router, private alertController: AlertController, private toastController: ToastController) {
    }

    ngOnInit() {
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


    addJourney() {
        this.router.navigate(['myjourney/addjourney']);
    }

    getTravel(){
        console.log("thisssssssss"+this.mydate);
        this.database.getTravel(this.mydate).then(data =>{
            this.travels = data;
        })
        console.log("travell"+this.travels);

    }



}





 
