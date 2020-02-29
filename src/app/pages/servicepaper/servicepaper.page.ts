import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

 
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DatabaseService, Travel, Agency } from 'src/app/database.service';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
//pdfMake.vfs = pdfFonts.pdfMake.fonts





 0
@Component({
  selector: 'app-servicepaper',
  templateUrl: './servicepaper.page.html',
  styleUrls: ['./servicepaper.page.scss'],
})
export class ServicepaperPage implements OnInit {
 
 
  pdfObj = null;
  mydate: string = new Date().toLocaleDateString('it-IT');
  travels: Travel [] = [];
  agency : Agency [] = [];


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
 
  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener,private database:DatabaseService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
   }

  ngOnInit(){
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

    this.database.getTravelisPaidDate(this.mydate,1).then(data =>{
      this.travels = data;
      });
    this.database.getAgency().then(agency =>{
      this.agency['agency_id'] = agency.agency_id;
      this.agency['name_agency'] = agency.name_agency;
      this.agency['vat_agency'] = agency.vat_agency;
      this.agency['address_agency'] = agency.address_agency;
      this.agency['city_agency'] = agency.city_agency;
      this.agency['cap_agency'] = agency.cap_agency,
      this.agency['province_agency'] = agency.province_agency;
      this.agency['owner_agency'] = agency.owner_agency;
      this.agency['phone_agency'] = agency.phone_agency;
    })

  }

  onChangeDate(){
    this.database.getTravelisPaidDate(this.mydate,1).then(data =>{
        this.travels = data;
        });
  }
 
  createPdf(travel: Travel) {
    var docDefinition = {
      content: [
        { text: 'Noleggio con conducente di '+ this.agency['owner_agency'], alignment:'center', style:'header'},
        { text: 'Sede operativa e legale: ' +
        this.agency['address_agency']+ ','+ this.agency['city_agency']+ ' ' + this.agency['cap_agency'] + '( ' + this.agency['province_agency'] + ' )', alignment:'center',style:'header'},
        { text: 'FOGLIO DI SERVIZIO NCC', style: 'header',alignment:'right' },
        { text: 'ID VIAGGIO : '+ travel.travel_id,style: 'header',alignment:'right' },
        { text: 'DATA : '+ this.mydate, alignment: 'right', style: 'header' },
 
        { text: 'TARGA VEICOLO:     ' +travel.licence_plate , style: 'subheader' },
        { text: 'NOME E COGNOME CONDUCENTE:     ' +travel.name_driver + '  ' + travel.surname_driver , style: 'subheader' },
        { text: 'DATA DI PARTENZA:     ' +travel.date, style: 'subheader' },
        { text: 'DATA DI ARRIVO:     ' +travel.date, style: 'subheader' },
        { text: 'LUOGO DI PARTENZA:     ' +travel.address_departure + ', ' +travel.city_departure +' ('+ travel.province_departure + ' )' , style: 'subheader' },
        { text: 'LUOGO DI ARRIVO:     ' +travel.address_arrival + ', ' +travel.city_arrival +' ('+ travel.province_arrival + ' )' , style: 'subheader' },



        //COME VANNO MODELLATI I KM?????

        { text: 'KM DI PARTENZA:     ' +travel.travel_id +' KM     KM DI ARRIVO:     ' +travel.travel_id +' KM' , style: 'subheader' },
        { text: 'ORA INIZIO SERVIZIO:     ' +travel.hour , style: 'subheader' },
        //SOMMARE ORA PERCORRENZA + TEMPO IMPIEGATO 
        { text: 'ORA FINE SERVIZIO:     ' +travel.hour, style: 'subheader' },
        { text: 'DATI COMMITTENTE:     ' +travel.name_client +' ' + travel.surname_client , style: 'subheader' },
      ],
      styles: {
        header: {
          margin: [50, 0, 30, 0],
          fontSize: 20,
          bold: true,
          //lineHeight: 1
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0],
          lineHeight: 2,
        },
        story: {
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
 
  downloadPdf(travel : Travel) {
    this.createPdf(travel);
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer: BlobPart) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'travel_'+ travel.travel_id +'.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'travel_'+ travel.travel_id +'.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
 
}