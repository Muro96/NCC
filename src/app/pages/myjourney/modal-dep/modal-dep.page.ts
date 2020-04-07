import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { DatabaseService, Departure } from 'src/app/database.service';

@Component({
  selector: 'app-modal-dep',
  templateUrl: './modal-dep.page.html',
  styleUrls: ['./modal-dep.page.scss'],
})
export class ModalDepPage implements OnInit {
  dep_address: null;
  dep_input: any;

  constructor(private modalController: ModalController, private navParams: NavParams, private database: DatabaseService, private alertController: AlertController) {

    this.dep_address = this.navParams.get('address_dep');
  }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  async addDep() {
    let res = await this.database.checkDep_present(this.dep_address);
    if ((this.dep_input == undefined || this.dep_input == null) && (this.dep_address == undefined || this.dep_address == null)) {
      this.invalidForm();
    }
    else if (res != 0) {
      this.addressAlreadyPresent();
    }
    else {
      await this.database.addDeparture(this.dep_input, this.dep_address);
      await this.modalController.dismiss(this.dep_input);
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
