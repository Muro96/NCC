import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Agency } from 'src/app/database.service';

@Component({
  selector: 'app-updateagency',
  templateUrl: './updateagency.page.html',
  styleUrls: ['./updateagency.page.scss'],
})
export class UpdateagencyPage implements OnInit {
  agency: Agency[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private database: DatabaseService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.agency = this.router.getCurrentNavigation().extras.state.agency;
        console.log("dati agenzia passati" + this.agency);
      }
    });
  }
  ngOnInit() {
  }

  update() {
    try {
      this.database.updateAgency(this.agency['name_agency'], this.agency['vat_agency'], this.agency['address_agency'], this.agency['city_agency'], this.agency['cap_agency'], this.agency['province_agency'], this.agency['owner_agency'], this.agency['phone_agency'])
      this.router.navigateByUrl('/settings/agency');
    } catch{
        console.log('error update');
    }

  }

}
