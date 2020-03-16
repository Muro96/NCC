import {Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, NgZone} from '@angular/core';
import {ModalController, Platform, AlertController, ToastController} from '@ionic/angular';
import {Ionic4DatepickerModalComponent} from '@logisticinfotech/ionic4-datepicker';
import {DatabaseService, Client, Travel, Departure, Arrival, Vehicle} from 'src/app/database.service';
import {Router} from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
import { ModalDepPage } from '../modal-dep/modal-dep.page';

declare var google;

@Component({
    selector: 'app-addjourney',
    templateUrl: './addjourney.page.html',
    styleUrls: ['./addjourney.page.scss'],
})
export class AddjourneyPage implements OnInit {
    select_dep:null;
    select_arr:null;
    travel = {};
    travels: Travel[] = [];
    client : Client;
    checked = false;

    departure = {};
    departures: Departure[] = [];

    arrival = {};
    arrivals: Arrival [] = [];

    client_select: any;
    


  
    latlng_arr: any;
    latlng_dep: any;
    place_dep: any;

   
 

    time: string = new Date().toLocaleTimeString('it-IT', {hour: '2-digit', minute: '2-digit'});
    //options = {day: 'numeric', month: 'numeric', year: 'numeric'};
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
    weeksList = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'];
    selectedDate: any;
    clients: Client[] = [];
    vehicles: Vehicle[] = [];

    GoogleAutocomplete: any;
    autocomplete: { input: string; };
    autocompleteItems: any[];

    location: any;
    placeid: any;
    response_dep:any;
    @ViewChild('selectArr') selectArr : IonicSelectableComponent;
    


    constructor(public modalCtrl: ModalController, private database: DatabaseService, private platform: Platform, private router: Router, private alertController: AlertController, private toastController: ToastController) {
    }

    ngOnInit() {
        this.database.getDatabaseState().subscribe(async ready => {
            if (ready) {
                this.database.getClients().then(async data => {
                     this.clients = data;
                });
                this.database.getAllVehicles().then(vehicle =>{
                    this.vehicles = vehicle;

                })
                this.database.getArrivals().then(arrival =>{
                    this.arrivals = arrival;
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

      reset_arr(){
          this.selectArr.clear();
          this.selectArr.close();

      }
      confirm_arr(){
          this.selectArr.confirm();
          this.selectArr.close();
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
    async getAddressDep(): Promise<any> {
       
        let inputfield = document.getElementById('autocomplete_input_dep').getElementsByTagName('input')[0];
        
        if (inputfield.value.length >7){
            
            let autocomplete_dep= new google.maps.places.Autocomplete((inputfield), {
                types: ['address'],
                componentRestrictions: {country: 'it'},
            });
            autocomplete_dep.setFields(['formatted_address','name','geometry']);
        
            google.maps.event.addListener(autocomplete_dep, `place_changed`, () => {
                var place = autocomplete_dep.getPlace();
            
           

            //console.log("name"+place.name);
                this.input_value = inputfield.value;
                console.log("dio cane"+this.input_value );
            //this.latlng_dep = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
            
            //console.log("latlng_dfiowehfiwofhep"+this.latlng_dep);
           
            //return this.input_value;
                //latlng_dep: this.latlng_dep,
                
              
        });
    }   
        this.input_value = inputfield.value;
        console.log("dio porco"+this.input_value);
        return this.input_value;
        

    
  
        
        //return [this.latlng_dep,place.formatted_address];

    
}

    getAddressArr(): any {
        let inputfield = document.getElementById('autocomplete_input_arr').getElementsByTagName('input')[0];
        let autocomplete_arr = new google.maps.places.Autocomplete((inputfield), {
            types: ['address'],
            componentRestrictions: {country: 'it'},
        });
        autocomplete_arr.setFields(['formatted_address']);

        google.maps.event.addListener(autocomplete_arr, `place_changed`, () => {
            var place = autocomplete_arr.getPlace();
            this.input_value1 = inputfield.value;
            this.latlng_arr = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
    
            return [this.latlng_arr,place.formatted_address];

       
        });

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
        console.log(this.client.client_id);
        return this.client.client_id;
        
      }
        
    

   

    gotoAddClient() {
        this.router.navigate(['/settings/clients']);

    }

    async presentModal() {
        const res = await (await this.getAddressDep());
        console.log("response modal"+res);
        const modal = await this.modalCtrl.create({
          component: ModalDepPage,
          componentProps: {
            address_dep:  res
          }
        });
        return await modal.present();
      }

    async blur_arrival(){
        document.getElementsByClassName("arrival")[0].setAttribute("style", "visibility: visible;"); 
        //await this.presentModal(); 

    }

    blur_client(){
        document.getElementsByClassName("client")[0].setAttribute("style", "visibility: visible;");  

    }
    blur_npass(){
        console.log("qui");
        document.getElementsByClassName("pass")[0].setAttribute("style", "visibility: visible;");  
    }
    blur_check(){
        document.getElementsByClassName("check")[0].setAttribute("style", "visibility: visible;");  

    }

    /* async checkArrival() {
         let res = await this.database.checkArrival_present(this.arrival['address'],this.arrival['city']);
         return res;

     } */
    /* CHECK ARRIVAL WITH MAP (NOT TESTED)
    async checkArrival() {
        let latlng = this.getAddressArr();
        let split = latlng.split(",");
        let res = await this.database.checkArrival_present(split[0], split[1]);
        return res;
    }  */
    /* CHECK DEPARTURE WITH MAP (NOT TESTED)
    async checkDest() {
       /* let latlng = this.getAddressDep();
        let split = latlng.split(",");
        let res = await this.database.checkDest_present(split[0], split[1]);
        return res;
    } */


    //ADD ARRIVAL WITH MAP
    /*async addArrival() {
        /*let res = await this.checkArrival();
        if (res==0){
            let response = await this.distanceMatrix();
            let latlng = this.getAddressArr();
            let split = latlng.split(",");
            console.log("latlng_arr"+split);
            //split this address to get all the info to insert
            let address = response.originAddresses;
            this.database.addArrival(this.arrival['city'],this.arrival['country'],this.arrival['address']);
        else{
            console.log("arrival already present in db");
        }

    }

    async addDeparture(){
        this.database.addDeparture(this.departure['city'],this.departure['country'],this.departure['address']);

    } */

    async addTravel() {
        //let client_id = this.getClientIdSelected();
        let res1 = this.getAddressDep();
        console.log("res2"+res1);

       // console.log("aggiuntttt"+client_id);
       /* if (this.checkPaid() == true){
            if (this.departure['city'] != null && this.arrival['city'] != null ) {
                //this.database.addTravel(this.departure['city'], this.departure['country'], this.departure['address'], this.arrival['city'], this.arrival['country'], this.arrival['address'], this.time, this.mydate, this.travel['n_pass'], this.travel['km_tot'], client_id,1,vehicle_id);
                this.travel = {};
                this.arrival = {};
                this.departure = {};
            } else {
                this.checkForm();
    
            }

        }
        else{
            if (this.departure['city'] != null && this.arrival['city'] != null ) {
                //this.database.addTravel(this.departure['city'], this.departure['country'], this.departure['address'], this.arrival['city'], this.arrival['country'], this.arrival['address'], this.time, this.mydate, this.travel['n_pass'], this.travel['km_tot'], client_id,0,vehicle_id);
                this.travel = {};
                this.arrival = {};
                this.departure = {};
            } else {
                this.checkForm();
    
            }

        } */
        


    }

    async addTravelApi(){
        //let client_id = this.getClientIdSelected();

    }

    checkPaid(){
        this.checked = !this.checked;
        console.log('this.checked__paid' + this.checked);
        return this.checked;
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

    onAddPort(){
        this.router.navigate(['settings/clients'])

    
      }

    //ADD DEPARTURE WITH MAP
    /*async addDeparture() {
        //let res = await this.
        let response = await this.distanceMatrix();
        let latlng = this.getAddressDep();
        let split = latlng.split(",");
        console.log("latlng_dest"+split);
        let address = response.destinationAddresses;
        this.database.addArrival(split[0],split[1],address);
    } */


}







