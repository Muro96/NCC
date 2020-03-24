import { Component, OnInit } from '@angular/core';
import { DatabaseService, Arrival } from 'src/app/database.service';
import { ToastController, AlertController } from '@ionic/angular';


@Component({
    selector: 'app-destinations',
    templateUrl: './destinations.page.html',
    styleUrls: ['./destinations.page.scss'],
})
export class DestinationsPage implements OnInit {
    arrival = {};
    arrivals: Arrival[] = [];
    constructor(public database: DatabaseService, private toastController: ToastController, private alertController: AlertController) {
    }


    ngOnInit() {
        this.database.getDatabaseState().subscribe(ready => {
            if (ready) {
                this.database.getArrivals().then(data => {
                    this.arrivals = data;
                });
            }
        });

    }

}
