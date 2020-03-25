import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updateagency',
  templateUrl: './updateagency.page.html',
  styleUrls: ['./updateagency.page.scss'],
})
export class UpdateagencyPage implements OnInit {

  constructor(private route: ActivatedRoute,private router:Router) { 
  this.route.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state) {
        this.client = this.router.getCurrentNavigation().extras.state.client;
        console.log("dati cliente passati"+this.client);
    }
});
  }

  ngOnInit() {
  }

}
