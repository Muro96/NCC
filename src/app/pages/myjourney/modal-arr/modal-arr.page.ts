import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-modal-arr',
  templateUrl: './modal-arr.page.html',
  styleUrls: ['./modal-arr.page.scss'],
})
export class ModalArrPage implements OnInit {
  arr_input: any;
  arr_address: null;

  constructor(private modalController: ModalController,private navParams:NavParams,private database : DatabaseService) { 
   
    this.arr_address = this.navParams.get('address_arr');
  }

  ngOnInit() {
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

  async addArr(){
    await this.database.addArrival(this.arr_input,this.arr_address);
    await this.modalController.dismiss(this.arr_input);

    }
  }
