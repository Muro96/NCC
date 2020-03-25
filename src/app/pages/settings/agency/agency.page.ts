import { Component, OnInit } from '@angular/core';
import { DatabaseService, Agency } from 'src/app/database.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.page.html',
  styleUrls: ['./agency.page.scss'],
})
export class AgencyPage implements OnInit {
  agency: Agency[] = [];


  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.database.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.database.getAgency().then(data => {
          this.agency['name_agency'] = data.name_agency,
            this.agency['vat_agency'] = data.vat_agency,
            this.agency['address_agency'] = data.address_agency,
            this.agency['city_agency'] = data.city_agency,
            this.agency['cap_agency'] = data.cap_agency,
            this.agency['province_agency'] = data.province_agency,
            this.agency['owner_agency'] = data.owner_agency,
            this.agency['phone_agency'] = data.phone_agency
        });
      }
    })
  }

  updateAgency() {

    let navigationExtras: NavigationExtras = {
      state: {
        agency: this.agency
      }
    };
    this.router.navigate(['settings/agency/updateagency'], navigationExtras);


  }

}
