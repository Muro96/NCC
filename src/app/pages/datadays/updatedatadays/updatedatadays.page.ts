import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DatabaseService, Register, Vehicle } from 'src/app/database.service';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import {ModalController} from '@ionic/angular';
import {Ionic4DatepickerModalComponent} from '@logisticinfotech/ionic4-datepicker';


@Component({
  selector: 'app-updatedatadays',
  templateUrl: './updatedatadays.page.html',
  styleUrls: ['./updatedatadays.page.scss'],
})
export class UpdatedatadaysPage implements OnInit {
  options = {day: 'numeric', month: 'numeric', year: 'numeric'};
  mydate: string = new Date().toLocaleDateString('it-IT', this.options);

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
  selectedDate;
  register = {};
  registers: Register [] = [];
  vehicles : Vehicle [] = [];
  vehicle_id_select: any;
  
  constructor(private navController: NavController,public modalCtrl: ModalController,private route: ActivatedRoute, private router: Router, public database: DatabaseService, public toastController: ToastController, public alertController: AlertController) {

    this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
            this.registers = this.router.getCurrentNavigation().extras.state.register;
        }
    });
  }




  ngOnInit() {
      this.database.getDatabaseState().subscribe(ready => {
          if (ready) {
              this.database.getAllVehicles().then(data => {
                  this.vehicles = data;
              });
          } 

      });
      

      // EXAMPLE OBJECT
      this.datePickerObj = {
          inputDate: this.mydate,

          dateFormat: 'DD/M/YYYY',
          fromDate: new Date('01/01/1960'), // default null
          closeOnSelect: true, // default false
        
          todayLabel: 'Oggi', // default 'Today'
          closeLabel: 'Chiudi', // default 'Close'
          titleLabel: 'Conferma Data', // default null
          monthsList: this.monthsList,
          weeksList: this.weeksList,
          momentLocale: 'it-IT',
          yearInAscending: true
      };
  }

  onChangeDate() {
      console.log('onChangeDate date ', this.mydate);
  }

  onClickSubmit() {
      // console.log('onClickSubmit', this.dataForm.value);
  }

  async openDatePicker() {
      /*const datePickerObj = {
        inputdate: moment(new Date('2019-02')),
        closeOnSelect: true,
        titleLabel: 'Data',
        closeLabel: 'Schließen',
        monthsList: [
          'Gen',
          'Feb',
          'Mar',
          'Apr',
          'Mag',
          'Giu',
          'Lug',
          'Ago',
          'Set',
          'Ott',
          'Nov',
          'Dic'
        ],
        showTodayButton: false,
        weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        dateFormat: 'DD.MM.YYYY',
        clearButton: true
      };  */

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
  getVehicleIdSelect() {
      console.log("this_vehicleeeeeee"+this.vehicle_id_select);
      return this.vehicle_id_select;
  }

  addRegister(){
    
    let vehicle_id = this.getVehicleIdSelect();
    let navigationExtras: NavigationExtras = {
      state: {
          vehicle_id: vehicle_id,
      }}
    this.database.addRegister(0,this.mydate,this.register['km_start'],this.register['km_end'],vehicle_id);
    
    this.router.navigateByUrl('/datadays',navigationExtras);
    }

}
