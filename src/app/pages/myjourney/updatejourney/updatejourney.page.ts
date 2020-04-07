import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Travel, Departure, Arrival, Client } from 'src/app/database.service';

@Component({
  selector: 'app-updatejourney',
  templateUrl: './updatejourney.page.html',
  styleUrls: ['./updatejourney.page.scss'],
})
export class UpdatejourneyPage implements OnInit {

  travel: Travel[] = [];
  arrival: Arrival[] = [];
  departure: Departure[] = [];
  client: Client[] = [];
  constructor(private route: ActivatedRoute, private router: Router, public database: DatabaseService) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.travel = this.router.getCurrentNavigation().extras.state.travel;
        console.log("dati travel passati" + this.travel['name_client']);
      }
    });
  }
  ngOnInit() {
    this.database.getDatabaseState().subscribe(async ready => {
      if (ready) {
        await this.retriveClient();
        await this.retrieveDep();
        await this.retrieveArr();

      }
    });
  }

  async retriveClient() {
    this.database.getClientData(this.travel['fk_client']).then(data => {
      this.client['client_id'] = data.client_id;
      this.client['name_client'] = data.name_client;
      this.client['surname_client'] = data.surname_client;
      this.client['city'] = data.city;
      this.client['province'] = data.province;
      this.client['is_private'] = data.is_private;
      this.client['is_agency'] = data.is_agency;
      this.client['cf'] = data.cf;
      this.client['vat'] = data.vat;
      this.client['billing_notes'] = data.billing_notes;

    });

  }

  async retrieveDep(){
    this.database.getDepartureData(this.travel['fk_departure']).then(data =>{
      this.departure['departure_id'] = data.departure_id;
      this.departure['name_dep'] = data.name_dep;
      this.departure['lat_dep'] = data.lat_dep;
      this.departure['long_dep'] = data.long_dep;
      this.departure['address_dep'] = data.address_dep;
    });
  }

  async retrieveArr(){
    this.database.getArrivalData(this.travel['fk_arrival']).then(data =>{
      this.arrival['arrival_id'] = data.arrival_id;
      this.arrival['name_arr'] = data.name_arr;
      this.arrival['lat_arr'] = data.lat_arr;
      this.arrival['long_arr'] = data.long_arr;
      this.arrival['address_arr'] = data.address_arr;
    });
  }

}