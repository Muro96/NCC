import {Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {ModalController, Platform, AlertController, ToastController} from '@ionic/angular';
import {Ionic4DatepickerModalComponent} from '@logisticinfotech/ionic4-datepicker';
import {DatabaseService, Client, Travel, Departure, Arrival} from 'src/app/database.service';
import {LatLng} from 'leaflet';
import {Router} from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NumberValueAccessor } from '@angular/forms';

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

    checked_ispaid = true;
    check_int= 1;

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
    mydate: string = new Date().toLocaleDateString('it-IT');


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
    weeksList = ['DOM','LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'];
    selectedDate: any;
    clients: Client[] = [];

    constructor(public modalCtrl: ModalController, private database: DatabaseService, private platform: Platform, private router: Router, private alertController: AlertController, private toastController: ToastController) {
    }

    ngOnInit() {
        this.datePickerObj = {
            inputDate: this.mydate,
            dateFormat: 'DD/M/YYYY',
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
                this.database.getTravelisPaidDate(this.mydate,1).then(data =>{
                    this.travels = data;
            });
            }
    });
}

    onChangeDate(){
        console.log("myyydate"+this.mydate);
        this.database.getTravelisPaidDate(this.mydate,1).then(data =>{
            this.travels = data;
    });

    }
    

    addJourney() {
        this.router.navigate(['myjourney/addjourney']);
    }

    cancelTravel(travel_id:number){
        console.log("traaaaaavel"+travel_id);
        this.database.cancelTravel(travel_id);
        this.database.getTravelisPaidDate(this.mydate,this.check_int).then(data =>{
            this.travels = data;
    });


    }

    async cancel(travel_id:number) {
        const alert = await this.alertController.create({
            header: 'SEI SICURO DI VOLER ELIMINARE IL VIAGGIO?',

            buttons: [{
                text: 'OK',
                cssClass: 'secondary',
                handler: () => {
                    this.cancelTravel(travel_id);
                }
            },
                {
                    text: 'ANNULLA',
                }
            ]

        });

        await alert.present();
    }

    async checkPaid(){
        this.checked_ispaid = !this.checked_ispaid;
        if(this.checked_ispaid==true){
            this.check_int=1;
            await this.database.getTravelisPaidDate(this.mydate,this.check_int).then(data =>{
                this.travels = data;
            })
        }
        else{
            this.check_int=0;
            await this.database.getTravelisPaidDate(this.mydate,this.check_int).then(data =>{
                this.travels = data;
            })
        }
        console.log('this.checked__paid' + this.checked_ispaid);
        console.log('check_int' + this.check_int);
        
        }
}





 
