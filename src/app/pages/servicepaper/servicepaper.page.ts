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
import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
 
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class ServicepaperPage {
  letterObj = {
    to: '',
    from: '',
    text: ''
  }
 
  pdfObj = null;
 
  constructor(public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener) { }
 
  createPdf() {
    var docDefinition = {
      content: [
        { text: 'REMINDER', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'From', style: 'subheader' },
        { text: this.letterObj.from },
 
        { text: 'To', style: 'subheader' },
        this.letterObj.to,
 
        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
 
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
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
 
}