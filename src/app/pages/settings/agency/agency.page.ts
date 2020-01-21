import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DatabaseService, Agency} from '../../../database.service'
import { NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.page.html',
  styleUrls: ['./agency.page.scss'],
})


export class AgencyPage implements OnInit{

  agencies: Agency[] = [];
  agency = {};
  toast: any;
  selectedView = 'list_agency';

  constructor(public navCtrl: NavController, public database: DatabaseService, public toastController: ToastController){}

  ngOnInit() {
    this.database.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.database.getAgency().subscribe(agency => {
          this.agencies = agency;
        });    
      }
    });
  }

  addAgency(){
    this.database.addAgency(this.agency['name'], this.agency['vat'],this.agency['cf'],this.agency['address'],this.agency['city'],this.agency['cap'],this.agency['province'],this.agency['phone'])
    .then(_ => {
      this.agency = {};
    });
    this.showToast();
    this.hideToast();

  }

  showToast() {
    this.toast = this.toastController.create({
      message: 'Aggiunta nuova azienda!',
      duration: 4000
    }).then((toastData)=>{
      toastData.present();
    });
  }

  hideToast(){
    this.toast = this.toastController.dismiss();
  }

  removeItem(agency:Agency, i:number){
    this.agencies.splice(i,1);
    this.database.deleteAgency(agency.agency_id);
}

  
  }
  
