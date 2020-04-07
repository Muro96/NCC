import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-modal-arr',
  templateUrl: './modal-arr.page.html',
  styleUrls: ['./modal-arr.page.scss'],
})
export class ModalArrPage implements OnInit {
  arr_input: any;
  arr_address: null;

  constructor(private modalController: ModalController,private navParams:NavParams,private database : DatabaseService,private alertController:AlertController) { 
   
    this.arr_address = this.navParams.get('address_arr');
  }

  ngOnInit() {
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

  async addArr(){
    let res = await this.database.checkArrival_present(this.arr_address);
    if((this.arr_input == undefined || this.arr_input == null) && (this.arr_address == undefined || this.arr_address == null)){
      this.invalidForm();
    }
    else if (res != 0){
      this.addressAlreadyPresent();
      this.arr_input = "";
    }
    else{
      await this.database.addArrival(this.arr_input,this.arr_address);
      await this.modalController.dismiss(this.arr_input);
    }
   

    }

    async invalidForm() {
      const alert = await this.alertController.create({
          header: 'COMPILA TUTTI I CAMPI!',
          subHeader: 'Assicurati di aver compilato i campi!',

          buttons: [{
              text: 'OK',
              cssClass: 'secondary',
          }]

      });

      await alert.present();
  }

  async addressAlreadyPresent() {
    const alert = await this.alertController.create({
        header: "INDIRIZZO GIA' PRESENTE",
        subHeader: 'SELEZIONA INDIRIZZO DALLA LISTA',

        buttons: [{
            text: 'OK',
            cssClass: 'secondary',
            handler: () => { this.modalController.dismiss(); }
        }]

    });

    await alert.present();
}

  }
