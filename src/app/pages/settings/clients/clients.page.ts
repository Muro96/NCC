import {Component, OnInit} from '@angular/core';
import {DatabaseService, Client} from 'src/app/database.service';
import {ToastController, AlertController, NavController} from '@ionic/angular';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
    is_from_add:number;
    public clientForm: FormGroup;

    constructor(public database: DatabaseService,private route: ActivatedRoute, private toastController: ToastController,private alertController:AlertController,private router:Router,private navController:NavController,public formBuilder: FormBuilder) {
        this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
            this.is_from_add = this.router.getCurrentNavigation().extras.state.is_from_add;
            console.log("is_from_add"+this.is_from_add);
            }
        });
        this.clientForm = formBuilder.group({
           name_client: new FormControl(''),
           surname_client: new FormControl(''),
           city: new FormControl('',Validators.compose([Validators.required,Validators.maxLength(40)])),
           province: new FormControl('',Validators.compose([Validators.pattern('^[A-Z]{2}$'),Validators.required,Validators.maxLength(2)])),
           cf: new FormControl('',Validators.compose([Validators.pattern('^[A-Za-z]{6}[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$')])),
           vat: new FormControl('',Validators.compose([Validators.pattern('[0-9]{11}$'),Validators.maxLength(11)])),
           billing_notes: new FormControl('',Validators.compose([Validators.maxLength(40)]))
        })
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
        if (this.clientForm.controls.name_client.valid && this.clientForm.controls.surname_client.valid  && this.clientForm.controls.city.valid && this.clientForm.controls.province.valid  && this.clientForm.controls.cf.valid  && this.clientForm.controls.vat.valid  && this.clientForm.controls.billing_notes.valid ){
            if (this.checkPrivate() == true) {
                this.database.addClient(this.client['name_client'], this.client['surname_client'], this.client['city'], this.client['province'], 1, 0, this.client['cf'], this.client['vat'], this.client['billing_notes']).then(async _ => {
                    this.clientForm.reset();
                    await this.database.getClients().then(data => {
                        this.clients = data;
                    });
                });

                this.showToast();
                this.hideToast();
                console.log("is_from_add dentro add"+this.is_from_add);
                if(this.is_from_add==1){
                    this.navController.navigateBack(['myjourney/addjourney']);
                }
            
            

        } else {
            console.log('false');
            this.database.addClient(this.client['name_client'], this.client['surname_client'], this.client['city'], this.client['province'], 0, 1, this.client['cf'], this.client['vat'], this.client['billing_notes']).then(async _ => {
                this.clientForm.reset();
                await this.database.getClients().then(data => {
                    this.clients = data;
                });

            });
            this.showToast();
            this.hideToast();
            if(this.is_from_add==1){
                this.navController.navigateBack(['myjourney/addjourney']);
            }
        }
    }
    else{
        this.showToast();
        
    }


    }

    hideToast() {
        this.toast = this.toastController.dismiss();
    }

    showToast() {
        this.toast = this.toastController.create({
            message: 'Aggiunto nuovo cliente!',
            duration: 2000
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
            header: 'SEI SICURO DI VOLER ELIMINARE IL CLIENTE?',

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

    async updateClient(client: Client){
        let navigationExtras: NavigationExtras = {
            state: {
                client: client
            }
        };
        this.router.navigate(['settings/clients/updateclient'], navigationExtras);
    }


}
