import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Ionic4DatepickerModalComponent} from '@logisticinfotech/ionic4-datepicker';
import * as moment_ from 'moment';

const moment = moment_;

@Component({
    selector: 'app-datadays',
    templateUrl: './datadays.page.html',
    styleUrls: ['./datadays.page.scss'],
})


export class DatadaysPage implements OnInit {

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
    weeksList = ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'];
    selectedDate;

    constructor(public modalCtrl: ModalController) {
    }

    ngOnInit() {

        // EXAMPLE OBJECT
        this.datePickerObj = {
            // inputDate: new Date('12'), // If you want to set month in date-picker
            // inputDate: new Date('2018'), // If you want to set year in date-picker
            // inputDate: new Date('2018-12'), // If you want to set year & month in date-picker
            // inputDate: new Date('2018-12-01'), // If you want to set date in date-picker

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
}



 
 
 
 
  
 
