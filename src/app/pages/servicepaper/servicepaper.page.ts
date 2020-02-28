/*import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DatabaseService, Driver } from 'src/app/database.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs; 
/*
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts'; 

@Component({
  selector: 'app-servicepaper',
  templateUrl: './servicepaper.page.html',
  styleUrls: ['./servicepaper.page.scss'],
})
export class ServicepaperPage implements OnInit {
  drivers: Driver [] = [];
  pdfObj = null;

  constructor(private navCtrl:NavController,private plt:Platform,private file:File,private fileOpener:FileOpener,private database:DatabaseService,private toastCtrl:ToastController) { }

  ngOnInit() {
    this.database.getDatabaseState().subscribe(ready =>{
      if(ready){
        this.database.getDriverLogin().then(driver =>{
          this.drivers['driver_id'] = driver.driver_id;
          this.drivers['name'] = driver.name;
          this.drivers['surname'] = driver.surname;
          this.drivers['cf_driver'] = driver.cf_driver;
          this.drivers['phone'] = driver.phone;
          this.drivers['email'] = driver.email;
          this.drivers['password'] = driver.password;
          this.drivers['is_login'] = driver.is_login;

      });

      }
    })
  }


 /* makePdf() {
    let self = this;
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    var docDefinition = {
      content: [    
        { text: 'BITCOIN', style: 'header' },
        { text: 'Cryptocurrency Payment System', style: 'sub_header' },
        { text: 'WEBSITE: https://bitcoin.org/', style: 'url' },
        ],
      styles: {
        header: {
          bold: true,
          fontSize: 20,
          alignment: 'right'
        },
        sub_header: {
          fontSize: 18,
          alignment: 'right'
          },
        url: {
          fontSize: 16,
          alignment: 'right'
        }
      },
      pageSize: 'A4',
      pageOrientation: 'portrait'
    };

    pdfmake.createPdf(docDefinition).getBuffer(function (buffer) {
      let utf8 = new Uint8Array(buffer);
      let binaryArray = utf8.buffer;
      self.saveToDevice(binaryArray,"Bitcoin.pdf")
    });
    }

 /* async saveToDevice(data:any,savefile:any){
    let self = this;
    self.file.writeFile(self.file.externalDataDirectory, savefile, data, {replace:false});
    const toast = await self.toastCtrl.create({
      message: 'File saved to your device',
      duration: 3000,
      position: 'top'
    });
    toast.present();
    } 
    
  //passare come oggetto il viaggio in questione
  createPdf() {
    var docDefinition = {
      content: [
        { text: 'REMINDER', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },

        { text: 'From', style: 'subheader' },
        { text: this.drivers['name'] },

        { text: 'To', style: 'subheader' },
        this.drivers['surname'],

        

        {
          ul: [
            'Bacon',
            'Rips',
            'BBQ',
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer: BlobPart) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.externalDataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.externalDataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

} */
import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

 
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DatabaseService, Travel } from 'src/app/database.service';

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
  letterObj = {
    to: '',
    from: '',
    text: ''
  }
 
  pdfObj = null;
  mydate: string = new Date().toLocaleDateString('it-IT');
  travels: Travel [] = [];
 
  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener,private database:DatabaseService) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
   }

  ngOnInit(){
    this.database.getTravelisPaidDate(this.mydate,1).then(data =>{
      this.travels = data;
      });

  }
 
  createPdf(travel: Travel) {
    var docDefinition = {
      content: [

        { text: 'FOGLIO DI SERVIZIO NCC', style: 'header',alignment:'right' },
        { text: 'ID VIAGGIO : '+ travel.travel_id,style: 'header',alignment:'right' },
        { text: 'DATA : '+ this.mydate, alignment: 'right', style: 'header' },
 
        { text: 'TARGA VEICOLO: _________________ ' +travel.licence_plate +'____________________' , style: 'subheader' },
        { text: 'NOME E COGNOME CONDUCENTE: _________________ ' +travel.name_driver + '  ' + travel.surname_driver , style: 'subheader' },
        { text: 'DATA DI PARTENZA: _________________ ' +travel.date +'____________________' , style: 'subheader' },
        { text: 'DATA DI ARRIVO: _________________ ' +travel.date +'____________________' , style: 'subheader' },
        { text: 'LUOGO DI PARTENZA: _________________ ' +travel.address_departure + ', ' +travel.city_departure +' ('+ travel.province_departure + ' ) ____________________' , style: 'subheader' },
        { text: 'LUOGO DI ARRIVO: _________________ ' +travel.address_arrival + ', ' +travel.city_arrival +' ('+ travel.province_arrival + ' ) ____________________' , style: 'subheader' },



        //COME VANNO MODELLATI I KM?????

        { text: 'KM DI PARTENZA: _________________ ' +travel.travel_id +'____________________   KM DI ARRIVO: _________________ ' +travel.travel_id +'____________________ ' , style: 'subheader' },
        { text: 'ORA INIZIO SERVIZIO: _________________ ' +travel.hour +'____________________' , style: 'subheader' },
        //SOMMARE ORA PERCORRENZA + TEMPO IMPIEGATO 
        { text: 'ORA FINE SERVIZIO: _________________ ' +travel.hour +'____________________' , style: 'subheader' },
        { text: 'DATI COMMITTENTE: _________________ ' +travel.name_client +'____________________' , style: 'subheader' },

 
        {
          ul: [
            'Bacon',
            'Rips',
            'BBQ',
          ]
        }
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