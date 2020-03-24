import { Component, OnInit } from '@angular/core';
import { Departure, DatabaseService } from 'src/app/database.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
    selector: 'app-departures',
    templateUrl: './departures.page.html',
    styleUrls: ['./departures.page.scss'],
})
export class DeparturesPage implements OnInit {
    departure = {};
    departures: Departure[] = [];

    constructor(public database: DatabaseService, private toastController: ToastController, private alertController: AlertController) { }

    ngOnInit() {
        this.database.getDatabaseState().subscribe(ready => {
            if (ready) {
                this.database.getDepartures().then(data => {
                    this.departures = data;
                });
            }
        });
    }

}
