import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-dep',
  templateUrl: './modal-dep.page.html',
  styleUrls: ['./modal-dep.page.scss'],
})
export class ModalDepPage implements OnInit {
  test:null;

  constructor(private modalController: ModalController,private navParams:NavParams) { 
   
    this.test = this.navParams.get('address_dep');
  }

  ngOnInit() {
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

}
