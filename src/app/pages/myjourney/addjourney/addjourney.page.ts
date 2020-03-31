import { Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, NgZone } from '@angular/core';
import { ModalController, Platform, AlertController, ToastController, NavController, IonCheckbox } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { DatabaseService, Client, Travel, Departure, Arrival, Vehicle } from 'src/app/database.service';
import { Router, NavigationExtras } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ModalDepPage } from '../modal-dep/modal-dep.page';
import { ModalArrPage } from '../modal-arr/modal-arr.page';

declare var google;

@Component({
    selector: 'app-addjourney',
    templateUrl: './addjourney.page.html',
    styleUrls: ['./addjourney.page.scss'],
})
export class AddjourneyPage implements OnInit {
    select_dep: Departure;
    select_arr: Arrival;
    travel = {};
    travels: Travel[] = [];
    client: Client;
    checked = true;
    checked_no = false;

    departure = {};
    departures: Departure[] = [];

    arrival = {};
    arrivals: Arrival[] = [];
    latlng_arr: any;
    latlng_dep: any;
    place_dep: any;



    time: string = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    //options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    mydate: string = new Date().toLocaleDateString('it-IT');


    input_value: string;
    input_value1: string;


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
    vehicles: Vehicle[] = [];

    GoogleAutocomplete: any;
    autocomplete: { input: string; };
    autocompleteItems: any[];

    dep_modal: any;
    arr_modal: any;

    location: any;
    placeid: any;
    

    arr_sel: any;
    dep_sel: any;
    //check_yes:boolean;
    //check_no: boolean;

    @ViewChild('selectArr', { static: true }) selectArr: IonicSelectableComponent;
    @ViewChild('selectDep', { static: true }) selectDep: IonicSelectableComponent;
    @ViewChild('selectClient', { static: true }) selectClient: IonicSelectableComponent;
    @ViewChild ('check_yes',{static:true}) check_yes: IonCheckbox;
    @ViewChild ('check_no',{static:true}) check_no: IonCheckbox;



    constructor(public modalCtrl: ModalController, private database: DatabaseService, private platform: Platform, private router: Router, private alertController: AlertController, private toastController: ToastController, private navController: NavController) {
    }

    ngOnInit() {
        this.database.getDatabaseState().subscribe(async ready => {
            if (ready) {
                this.database.getClients().then(async data => {
                    this.clients = data;
                });
                this.database.getAllVehicles().then(vehicle => {
                    this.vehicles = vehicle;

                })
                this.database.getArrivals().then(arrival => {
                    this.arrivals = arrival;
                })
                this.database.getDepartures().then(dep => {
                    this.departures = dep;
                })

            }
        });
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
    }
    ionViewDidEnter() {
        this.database.getDatabaseState().subscribe(async ready => {
            if (ready) {
                this.database.getClients().then(async data => {
                    this.clients = data;
                });
            }
        });

    }

    reset_arr() {
        this.selectArr.clear();
        this.selectArr.close();
        document.getElementsByClassName("arrival")[0].setAttribute("style", "visibility: hidden;");

    }
    confirm_arr() {
        this.selectArr.confirm();
        this.selectArr.close();
        document.getElementsByClassName("pass")[0].setAttribute("style", "visibility: visible;");
    }

    reset_dep() {
        this.selectDep.clear();
        this.selectDep.close();
        document.getElementsByClassName("arrival")[0].setAttribute("style", "visibility: hidden;");


    }

    confirm_dep() {
        this.selectDep.confirm();
        this.selectDep.close();
        document.getElementsByClassName("arrival")[0].setAttribute("style", "visibility: visible;");


    }

    confirm_client() {
        this.selectClient.confirm();
        this.selectClient.close();
    }




    //when a date is change on datepicker
    onChangeDate() {
        console.log('onChangeDate date ', this.mydate);
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
    async getAddressDep(): Promise<string> {

        let inputfield = document.getElementById('autocomplete_input_dep').getElementsByTagName('input')[0];


        if (inputfield.value.length > 7) {

            let autocomplete_dep = new google.maps.places.Autocomplete((inputfield), {
                types: ['address'],
                componentRestrictions: { country: 'it' },
            });
            autocomplete_dep.setFields(['formatted_address', 'name', 'geometry']);

            google.maps.event.addListener(autocomplete_dep, `place_changed`, () => {
                var place = autocomplete_dep.getPlace();
                this.input_value = place.formatted_address;
                console.log("input_value" + this.input_value);
                return this.input_value;
                //this.latlng_dep = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());

                //console.log("latlng_dfiowehfiwofhep"+this.latlng_dep);

                //return this.input_value;
                //latlng_dep: this.latlng_dep,


            });
        }
        return this.input_value;





        //return [this.latlng_dep,place.formatted_address];


    }

    async getAddressArr(): Promise<string> {
        let inputfield = document.getElementById('autocomplete_input_arr').getElementsByTagName('input')[0];
        if (inputfield.value.length > 7) {
            let autocomplete_arr = new google.maps.places.Autocomplete((inputfield), {
                types: ['address'],
                componentRestrictions: { country: 'it' },
            });
            autocomplete_arr.setFields(['formatted_address', 'name', 'geometry']);

            google.maps.event.addListener(autocomplete_arr, `place_changed`, () => {
                var place = autocomplete_arr.getPlace();
                this.input_value1 = place.formatted_address;
                return this.input_value1;
                //this.latlng_arr = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());

                //return [this.latlng_arr, place.formatted_address];


            });
        }
        return this.input_value1;
    }

    /* async distanceMatrix(): Promise<any> {
         let pos1: LatLng = this.getAddressArr();
         let pos2: LatLng = this.getAddressDep();
         /*console.log("pooooos111111"+pos1);
         console.log("pooooo22222"+pos2);
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
           this.map.setZoom(7);
     }*/

    //get the client_id selected on the ion-select-button
    getClientIdSelected() {
        console.log("clientttt" + this.client.client_id);
        return this.client.client_id

    }

    getDepSelect() {
        console.log("dep_select" + this.select_dep.address_dep);
        return this.select_dep.address_dep;
    }

    getArrSelect() {
        console.log("dep_arr" + this.select_arr.address_arr);
        return this.select_arr.address_arr;


    }


    async presentModalArr() {
        await new Promise(resolve => setTimeout(resolve, 700))
        const res = await this.getAddressArr();
        const modal = await this.modalCtrl.create({
            component: ModalArrPage,
            componentProps: {
                address_arr: res
            }
        });
        modal.onDidDismiss().then(data => {
            this.arr_modal = data['data'];
            console.log("response from " + this.arr_modal);
        })
        return await modal.present();

    }


    async presentModalDep() {
        await new Promise(resolve => setTimeout(resolve, 700))
        const res = await this.getAddressDep();
        console.log("response modal" + res);
        const modal = await this.modalCtrl.create({
            component: ModalDepPage,
            componentProps: {
                address_dep: res
            }
        });
        modal.onDidDismiss().then(data => {
            this.dep_modal = data['data'];
            console.log("response from " + this.dep_modal);
        })
        return await modal.present();
    }



    async blur_arrival() {
        document.getElementsByClassName("arrival")[0].setAttribute("style", "visibility: visible;");
        await this.presentModalDep();
    }

    blur_client() {
        document.getElementsByClassName("client")[0].setAttribute("style", "visibility: visible;");

    }
    async blur_npass() {
        document.getElementsByClassName("pass")[0].setAttribute("style", "visibility: visible;");
        await this.presentModalArr();
        
    }

    blur_check() {
        document.getElementsByClassName("check")[0].setAttribute("style", "visibility: visible;");

    }


    async addTravel() {
        let client_id = this.getClientIdSelected();
        let response_dep = await this.getAddressDep();
        let response_arr = await this.getAddressArr();
        if (!this.selectDep.hasValue()) {

            this.dep_sel = undefined;
        }
        else {
            this.dep_sel = this.getDepSelect();
        }

        if (!this.selectArr.hasValue()) {
            this.arr_sel = undefined
        }
        else {
            this.arr_sel = this.getArrSelect();
        }

        console.log("RES1" + response_dep)
        console.log("RES2" + response_arr)



        //if((this.getDepSelect() == undefined || this.getAddressDep()!= undefined) && (this.getArrSelect() != undefined || this.getAddressArr()!= undefined)){
        if (this.checkPaid() == true) {
            if (this.dep_sel == undefined && this.arr_sel == undefined) {
                console.log("CASO 1")
                this.database.addTravel(response_dep, response_arr, this.time, this.mydate, this.travel['n_pass'], client_id, 1);
                this.travel = {};
                this.arrival = {};
                this.departure = {};
            }
            else if (this.dep_sel != undefined && this.arr_sel == undefined) {
                console.log("CASO 2")
                this.database.addTravel(this.getDepSelect(), response_arr, this.time, this.mydate, this.travel['n_pass'], client_id, 1);
                this.travel = {};
                this.arrival = {};
                this.departure = {};

            }
            else if (this.dep_sel == undefined && this.arr_sel != undefined) {
                console.log("CASO 3")
                this.database.addTravel(response_dep, this.getArrSelect(), this.time, this.mydate, this.travel['n_pass'], client_id, 1);
                this.travel = {};
                this.arrival = {};
                this.departure = {};

            }
            else {
                console.log("CASO 4")
                this.database.addTravel(this.dep_sel, this.arr_sel, this.time, this.mydate, this.travel['n_pass'], client_id, 1);
                this.travel = {};
                this.arrival = {};
                this.departure = {};

            }


        }
        else {
            if (this.dep_sel == undefined && this.arr_sel == undefined) {
                console.log("CASO 5")
                this.database.addTravel(response_dep, response_arr, this.time, this.mydate, this.travel['n_pass'], client_id, 0);
                this.travel = {};
                this.arrival = {};
                this.departure = {};
            }
            else if (this.dep_sel != undefined && this.arr_sel == undefined) {
                console.log("CASO 6")
                this.database.addTravel(this.getDepSelect(), response_arr, this.time, this.mydate, this.travel['n_pass'], client_id, 0);
                this.travel = {};
                this.arrival = {};
                this.departure = {};

            }
            else if (this.dep_sel == undefined && this.arr_sel != undefined) {
                console.log("CASO 7")
                this.database.addTravel(response_dep, this.getArrSelect(), this.time, this.mydate, this.travel['n_pass'], client_id, 0);
                this.travel = {};
                this.arrival = {};
                this.departure = {};

            }
            else {
                console.log("CASO 8")
                this.database.addTravel(this.dep_sel, this.arr_sel, this.time, this.mydate, this.travel['n_pass'], client_id, 0);
                this.travel = {};
                this.arrival = {};
                this.departure = {};

            }

        }
    }






    onAddClient(event: {
        component: IonicSelectableComponent
    }) {
        // Clean form.
        this.selectClient.clear();
        this.selectClient.close();

        let navigationExtras: NavigationExtras = {
            state: {
                is_from_add: '1',

            }
        };
        this.navController.navigateForward(['settings/clients'], navigationExtras);
    }





    checkPaid() {
        this.checked = !this.checked;
        console.log('this.checked__paid' + this.checked);
        return this.checked;
    }

    checkPaid1() {
        this.checked_no = !this.checked_no;
        this.checked = !this.checked;
        console.log('dio cann' + this.checked);
        return this.checked_no;
    }


    async checkForm() {
        const alert = await this.alertController.create({
            header: 'COMPILA TUTTI I CAMPI!',
            subHeader: 'Assicurati di aver compilato i campi di partenza e destinazione',

            buttons: [{
                text: 'OK',
                cssClass: 'secondary',
            }]

        });

        await alert.present();
    }

}







