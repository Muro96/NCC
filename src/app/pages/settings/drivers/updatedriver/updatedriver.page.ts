import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DatabaseService, Driver } from 'src/app/database.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updatedriver',
  templateUrl: './updatedriver.page.html',
  styleUrls: ['./updatedriver.page.scss'],
})
export class UpdatedriverPage implements OnInit {
  drivers : Driver[] = [];
  driver = {};

  constructor(private route: ActivatedRoute,private router: Router, public database : DatabaseService,public toastController: ToastController,public alertController: AlertController) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.drivers = this.router.getCurrentNavigation().extras.state.driver;     
      }
    });
   }

  ngOnInit() {
  }
  
  save(driver:Driver){
    
  }
}
