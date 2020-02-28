import {Component, OnInit} from '@angular/core';
import {DatabaseService, Client} from 'src/app/database.service';
import {ToastController, AlertController} from '@ionic/angular';

@Component({
    selector: 'app-clients',
    templateUrl: './clients.page.html',
    styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {
    selectedView = 'list_client';
    client = {};
    clients: Client[] = [];
    toast: any;
    checked = false;

    constructor(public database: DatabaseService, private toastController: ToastController,private alertController:AlertController) {
    }

    ngOnInit() {
        this.database.getDatabaseState().subscribe(ready => {
            if (ready) {
                this.database.getClients().then(data => {
                    this.clients = data;
                });
            }
        });
    }

    async addClient() {
        if (this.checkPrivate() == true) {
            console.log('true');
            this.database.addClient(this.client['name_client'], this.client['surname_client'], this.client['city'], this.client['province'], 1, 0, this.client['cf'], this.client['vat'], this.client['billing_notes']).then(async _ => {
                this.client = {};
                await this.database.getClients().then(data => {
                    this.clients = data;
                });
            });

            this.showToast();
            this.hideToast();

        } else {
            console.log('false');
            this.database.addClient(this.client['name_client'], this.client['surname_client'], this.client['city'], this.client['province'], 0, 1, this.client['cf'], this.client['vat'], this.client['billing_notes']).then(async _ => {
                this.client = {};
                await this.database.getClients().then(data => {
                    this.clients = data;
                });

            });
            this.showToast();
            this.hideToast();
        }


    }

    hideToast() {
        this.toast = this.toastController.dismiss();
    }

    showToast() {
        this.toast = this.toastController.create({
            message: 'Aggiunto nuovo cliente!',
            duration: 3000
        }).then((toastData) => {
            toastData.present();
        });
    }

    checkPrivate() {
        this.checked = !this.checked;
        console.log('this.checked' + this.checked);
        return this.checked;

    }

    deleteClient(client_id:number){
        this.database.deleteClient(client_id);
        this.database.getClients().then(data =>{
            this.clients = data;
    });

    }

    async cancelClient(client_id:number) {
        const alert = await this.alertController.create({
            header: 'SEI SICURO DI VOLER ELIMINARE IL VIAGGIO?',

            buttons: [{
                text: 'OK',
                cssClass: 'secondary',
                handler: () => {
                    this.deleteClient(client_id);
                }
            },
                {
                    text: 'ANNULLA',
                }
            ]

        });

        await alert.present();
    }


}
