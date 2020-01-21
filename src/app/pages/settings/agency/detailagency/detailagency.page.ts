import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'src/app/database.service';

@Component({
  selector: 'app-detailagency',
  templateUrl: './detailagency.page.html',
  styleUrls: ['./detailagency.page.scss'],
})
export class DetailagencyPage implements OnInit {

  agencies: Agency[] = [];
  sub: any;

  constructor(private route: ActivatedRoute,private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.agencies = this.router.getCurrentNavigation().extras.state.agencies;
        console.log(this.agencies);
      }
    });
   }

  ngOnInit() {}

}
