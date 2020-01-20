import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {DatabaseService} from '../../../database.service'
import { NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.page.html',
  styleUrls: ['./agency.page.scss'],
})


export class AgencyPage implements OnInit {
  //agencies: Observable<any[]>;
  agency = {};
  toast: any;

  //variabili che prendo dal form per l'inserimento delle agenzie 
  /*name: string= "";
  vat: string= "";
  cf: string= "";
  address: string= "";
  city: string= "";
  cap: string= "";
  province: string= "";
  phone: string= ""; */

  constructor(public navCtrl: NavController, public database: DatabaseService, public toastController: ToastController){}

  ngOnInit() {
    /*this.database.getDatabaseState().subscribe(ready => {
      if(ready){
        this.agencies = this.database.getAgency();
      }
    })  */
  }

  addAgency(){
    this.database.addAgency(this.agency['name'], this.agency['vat'],this.agency['cf'],this.agency['address'],this.agency['city'],this.agency['cap'],this.agency['province'],this.agency['phone']);
    this.showToast();
    this.HideToast();

  }

  showToast() {
    this.toast = this.toastController.create({
      message: 'Aggiunta nuova azienda!',
      duration: 4000
    }).then((toastData)=>{
      toastData.present();
    });
  }

  HideToast(){
    this.toast = this.toastController.dismiss();
  }

  
  }
  
