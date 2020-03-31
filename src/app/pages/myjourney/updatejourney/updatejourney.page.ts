import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, Travel } from 'src/app/database.service';

@Component({
  selector: 'app-updatejourney',
  templateUrl: './updatejourney.page.html',
  styleUrls: ['./updatejourney.page.scss'],
})
export class UpdatejourneyPage implements OnInit {

  travel : Travel [] =  [];
  constructor(private route: ActivatedRoute, private router: Router, public database: DatabaseService) {

    this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
            this.travel = this.router.getCurrentNavigation().extras.state.travel;
            console.log("dati travel passati"+this.travel);
        }
    });
  }
  ngOnInit() {
  }

}
