import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';


import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DatabaseService, Travel, Agency, Driver, Vehicle, Register } from 'src/app/database.service';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { NavigationExtras } from '@angular/router';
pdfMake.vfs = pdfFonts.pdfMake.fonts


@Component({
  selector: 'app-servicepaper',
  templateUrl: './servicepaper.page.html',
  styleUrls: ['./servicepaper.page.scss'],
})
export class ServicepaperPage implements OnInit {


  pdfObj = null;
  pdfObjAll = null;
  mydate: string = new Date().toLocaleDateString('it-IT');
  travels: Travel[] = [];
  agency: Agency[] = [];
  drivers: Driver[] = [];
  vehicle: Vehicle[] = [];
  register: Register[] = [];
  vehicle_id_select: any;
  selectVehicle: any;


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
  weeksList = ['DOM', 'LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB'];

  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener, private database: DatabaseService, private alertController: AlertController, private navController: NavController) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit() {
    this.datePickerObj = {
      inputDate: this.mydate,
      dateFormat: 'D/M/YYYY',
      fromDate: new Date('1/1/1960'),
      closeOnSelect: true,
      todayLabel: 'Oggi',
      closeLabel: 'Chiudi',
      titleLabel: 'Conferma Data',
      monthsList: this.monthsList,
      weeksList: this.weeksList,
      momentLocale: 'it-IT',
      yearInAscending: true
    };

    this.database.getAllTravel(this.mydate).then(data => {
      this.travels = data;
    });
    this.database.getRegister(this.mydate).then(async data => {
      this.register['register_id'] = data.register_id;
      this.register['print_reg'] = data.print_reg;
      this.register['date'] = data.date;
      this.register['km_start'] = data.km_start;
      this.register['km_end'] = data.km_end;
      this.database.getVehicleId(data.fk_vehicle).then(async response => {
        this.vehicle['vehicle_id'] = response.vehicle_id;
        this.vehicle['car_brand'] = response.car_brand;
        this.vehicle['car_model'] = response.car_model;
        this.vehicle['license_plate'] = response.license_plate;


      })

    })

    this.database.getAgency().then(agency => {
      this.agency['agency_id'] = agency.agency_id;
      this.agency['name_agency'] = agency.name_agency;
      this.agency['vat_agency'] = agency.vat_agency;
      this.agency['address_agency'] = agency.address_agency;
      this.agency['city_agency'] = agency.city_agency;
      this.agency['cap_agency'] = agency.cap_agency,
        this.agency['province_agency'] = agency.province_agency;
      this.agency['owner_agency'] = agency.owner_agency;
      this.agency['phone_agency'] = agency.phone_agency;
    });
    this.database.getDriverLogin().then(driver => {
      this.drivers['driver_id'] = driver.driver_id;
      this.drivers['name'] = driver.name;
      this.drivers['surname'] = driver.surname;
      this.drivers['cf_driver'] = driver.cf_driver;
      this.drivers['phone'] = driver.phone;
      this.drivers['email'] = driver.email;
      this.drivers['password'] = driver.password;
      this.drivers['is_login'] = driver.is_login;
    })

  }

  ionViewDidEnter() {
    this.database.getAllTravel(this.mydate).then(data => {
      this.travels = data;
    });
    this.database.getAgency().then(agency => {
      this.agency['agency_id'] = agency.agency_id;
      this.agency['name_agency'] = agency.name_agency;
      this.agency['vat_agency'] = agency.vat_agency;
      this.agency['address_agency'] = agency.address_agency;
      this.agency['city_agency'] = agency.city_agency;
      this.agency['cap_agency'] = agency.cap_agency,
        this.agency['province_agency'] = agency.province_agency;
      this.agency['owner_agency'] = agency.owner_agency;
      this.agency['phone_agency'] = agency.phone_agency;
    });


  }


  onChangeDate() {
    this.database.getAllTravel(this.mydate).then(data => {
      this.travels = data;
    });
    this.database.getRegister(this.mydate).then(async data => {
      this.register['register_id'] = data.register_id;
      this.register['print_reg'] = data.print_reg;
      this.register['date'] = data.date;
      this.register['km_start'] = data.km_start;
      this.register['km_end'] = data.km_end;
      this.database.getVehicleId(data.fk_vehicle).then(async response => {
        this.vehicle['vehicle_id'] = response.vehicle_id;
        this.vehicle['car_brand'] = response.car_brand;
        this.vehicle['car_model'] = response.car_model;
        this.vehicle['license_plate'] = response.license_plate;


      })
    });
  }

  createPdf(travel: Travel) {
    var docDefinition = {
      content: [
        { text: 'Noleggio con conducente di' + this.agency['owner_agency'], style: 'header', alignment: 'center' },
        {
          text: 'Sede operativa e legale: ' +
            this.agency['address_agency'] + ',' + this.agency['city_agency'] + ' ' + this.agency['cap_agency'] + '( ' + this.agency['province_agency'] + ' )', style: 'header', alignment: 'center'
        },
        { text: 'P.IVA:' + this.agency['vat_agency'], style: 'header', alignment: 'center' },
        { text: 'Tel:' + this.agency['phone_agency'], style: 'header', alignment: 'center' },

        { text: 'ID VIAGGIO : ' + travel.travel_id, style: 'subheader', alignment: 'right' },
        { text: 'DATA : ' + this.mydate, alignment: 'right', style: 'subheader' },

        { text: 'TARGA VEICOLO:     ' + travel.licence_plate, style: 'subheader' },
        { text: 'NOME E COGNOME CONDUCENTE:     ' + travel.name_driver + '  ' + travel.surname_driver, style: 'subheader' },
        { text: 'DATA DI PARTENZA:     ' + travel.date, style: 'subheader' },
        { text: 'DATA DI ARRIVO:     ' + travel.date, style: 'subheader' },
        //{ text: 'LUOGO DI PARTENZA:     ' +travel.address_departure + ', ' +travel.city_departure +' ('+ travel.province_departure + ' )' , style: 'subheader' },
        //{ text: 'LUOGO DI ARRIVO:     ' +travel.address_arrival + ', ' +travel.city_arrival +' ('+ travel.province_arrival + ' )' , style: 'subheader' },



        //COME VANNO MODELLATI I KM?????

        { text: 'KM DI PARTENZA:     ' + travel.travel_id + ' KM     KM DI ARRIVO:     ' + travel.travel_id + ' KM', style: 'subheader' },
        { text: 'ORA INIZIO SERVIZIO:     ' + travel.hour, style: 'subheader' },
        //SOMMARE ORA PERCORRENZA + TEMPO IMPIEGATO 
        { text: 'ORA FINE SERVIZIO:     ' + travel.hour, style: 'subheader' },
        { text: 'DATI COMMITTENTE:     ' + travel.name_client + ' ' + travel.surname_client, style: 'subheader' },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify'
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

  downloadPdf(travel: Travel) {
    this.createPdf(travel);
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer: BlobPart) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'travel_' + travel.travel_id + '.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'travel_' + travel.travel_id + '.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }


  createPdf_AllTravel() {
    let travel_table: Travel[] = [];
    travel_table = this.travels;
    var rows_travel = [];
    var rows_register = [];

    rows_register.push([{ text: 'KM Iniziali', bold: true }, { text: 'Data', bold: true }]);
    rows_register.push([{ text: this.register['km_start'] }, { text: this.register['date'] }]);


    rows_travel.push(['Ora partenza', 'Indirizzo Partenza', 'Indirizzo Destinazione', 'Nome Cliente', 'N° passeggeri', 'Note_cliente', 'Note fatturazione']);
    travel_table.forEach(element => {
      rows_travel.push([element.hour, element.address_departure, element.address_arrival, element.name_client, element.n_pass, element.notes_travel, element.billing_notes_client]);
    });



    var rows_driver = [];
    rows_driver.push(['Nome Autista', 'Cognome Autista', 'Marca', 'Modello', 'Targa', 'Km iniziali', 'Km finali'])


    rows_driver.push([this.drivers['name'], this.drivers['surname'], this.vehicle['car_brand'], this.vehicle['car_model'], this.vehicle['license_plate'], this.register['km_start'], this.register['km_end']]);

    var docDefinition = {
      content: [
        { text: 'Noleggio con conducente di ' + this.agency['owner_agency'], style: 'header', alignment: 'center' },
        {
          text: 'Sede operativa e legale: ' +
            this.agency['address_agency'] + ',' + this.agency['city_agency'] + ' ' + this.agency['cap_agency'] + '( ' + this.agency['province_agency'] + ' )', style: 'header', alignment: 'center'
        },
        { text: 'P.IVA:' + this.agency['vat_agency'], style: 'header', alignment: 'center' },
        { text: 'Tel:' + this.agency['phone_agency'], style: 'header', alignment: 'center' },

        { text: 'Data: ' + this.register['date'], style: 'right' },


        // {
        //   style: 'subheader',
        //   table: {
        //     body: rows_register,
        //   },
        //   layout: {
        //       margin: [20,20],
        //       fillColor: function (rowIndex, node, columnIndex) {
        //         return (rowIndex % 2 === 0) ? '#3880ff' : null;
        //       }
        //     }
        // },


        {
          style: 'subheader',
          table: {
            body: rows_driver,
          },
          layout: {
            margin: [20, 20],
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#3880ff' : null;
            }
          }
        },

        {
          text: 'Lista Servizi giornalieri',
          style: 'middle',
          alignment: 'center',
          margin: [50, 25, 50, 25]
        },

        {
          style: 'subheader',
          table: {
            body: rows_travel,
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
        }

      ],



      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'justify',
          margin: 5

        },
        right: {
          fontSize: 16,
          bold: true,
          alignment: 'right',

        },
        middle: {
          fontSize: 14,
          bold: true,
          alignment: 'justify'
        },
        subheader: {
          fontSize: 14,
          margin: [0, 15, 0, 0],
          //lineHeight: 2,
        },

      }
    }


    this.pdfObjAll = pdfMake.createPdf(docDefinition);
  }

  async downloadPdfAll() {
    console.log('thisss.regstart'+this.register['km_start']);
    console.log('ENDDD'+this.register['km_end']);
    //posso scaricare il pdf solo se km_start e km_end sono compilati
    if (this.register['km_start'] == null || this.register['km_end'] == null) {
      await this.notCompleteRegister();
    }
    else {
      this.createPdf_AllTravel();
      if (this.plt.is('cordova')) {
        this.pdfObjAll.getBuffer((buffer: BlobPart) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });
          let file = 'travel' + this.mydate + '.pdf';

          // Save the PDF to the data Directory of our App
          this.file.writeFile(this.file.externalApplicationStorageDirectory, 'travel.pdf', blob, { replace: true }).then(fileEntry => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(this.file.externalApplicationStorageDirectory + 'travel.pdf', 'application/pdf');
          })
        });
      } else {
        // On a browser simply use download!
        this.pdfObjAll.download();
      }

    }

  }

  async notCompleteRegister() {
    const alert = await this.alertController.create({
      header: 'ATTENZIONE!',

      message: 'Dati del giorno incompleti!',
      buttons: [{
        text: 'COMPILA',
        cssClass: 'secondary',
        handler: () => {
          let navigationExtras: NavigationExtras = {
            state: {
              is_incomplete: '1',
              reg: this.register,

            }
          };
          this.navController.navigateForward(['/datadays'], navigationExtras);

        }
      },

      {
        text: 'ANNULLA',
      }

      ]

    });

    await alert.present();
  }



}
