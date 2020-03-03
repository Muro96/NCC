import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Client } from 'src/app/database.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-updateclient',
  templateUrl: './updateclient.page.html',
  styleUrls: ['./updateclient.page.scss'],
})
export class UpdateclientPage implements OnInit {
  client: Client [] = [];
  checked = false;

  constructor(private route: ActivatedRoute, private router: Router, public database: DatabaseService, public toastController: ToastController, public alertController: AlertController) {

    this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
            this.client = this.router.getCurrentNavigation().extras.state.client;
            console.log("dati cliente passati"+this.client);
        }
    });
  }

  ngOnInit() {
  }

  checkPrivate() {
    this.checked = !this.checked;
    console.log('this.checked' + this.checked);
    return this.checked;

}

  save() {
    console.log("idddd"+this.client['client_id']);
    if (this.checkPrivate()==true){
      this.database.updateClient(this.client['client_id'],this.client['name_client'], this.client['surname_client'], this.client['city'], this.client['province'], 1, 0, this.client['cf'], this.client['vat'], this.client['billing_notes']);
    }
    else {
      console.log('false');
      this.database.updateClient(this.client['client_id'],this.client['name_client'], this.client['surname_client'], this.client['city'], this.client['province'], 0, 1, this.client['cf'], this.client['vat'], this.client['billing_notes']);
    }

   
   
    //this.showToast();
    //this.hideToast();
    this.router.navigateByUrl('/settings/clients');

}

}
