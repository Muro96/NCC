import {Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {ModalController, Platform, AlertController, ToastController} from '@ionic/angular';
import {Ionic4DatepickerModalComponent} from '@logisticinfotech/ionic4-datepicker';
import {DatabaseService, Client, Travel} from 'src/app/database.service';
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
    travels: Travel[] = [];

    checked_ispaid = true;
    check_int= 1;

    time: string = new Date().toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'});
    options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    mydate: string = new Date().toLocaleDateString('it-IT');



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

    constructor(public modalCtrl: ModalController, private database: DatabaseService, private router: Router, private alertController: AlertController) {
    }

    ngOnInit() {
        this.datePickerObj = {
            inputDate: this.mydate,
            dateFormat: 'D/M/YYYY',
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
        this.database.getTravelisPaidDate(this.mydate,1).then(data =>{
            this.travels = data;
    });

    }
    

    addJourney() {
        this.router.navigate(['myjourney/addjourney']);
    }

    cancelTravel(travel_id:number){
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
        }

        updateTravel(travel_id:number){
            this.router.navigate(['myjourney/updatejourney']);

        }
}





 
