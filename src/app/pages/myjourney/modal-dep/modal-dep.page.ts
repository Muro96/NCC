import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DatabaseService, Departure } from 'src/app/database.service';

@Component({
  selector: 'app-modal-dep',
  templateUrl: './modal-dep.page.html',
  styleUrls: ['./modal-dep.page.scss'],
})
export class ModalDepPage implements OnInit {
  dep_address:null;
  dep_input: any;

  constructor(private modalController: ModalController,private navParams:NavParams,private database : DatabaseService) { 
   
    this.dep_address = this.navParams.get('address_dep');
  }

  ngOnInit() {
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

  async addDep(){
    await this.database.addDeparture(this.dep_input,this.dep_address);
    await this.modalController.dismiss(this.dep_input);

    }
  }
