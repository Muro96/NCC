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
  toast: any;

  constructor(private route: ActivatedRoute,private router: Router, public database : DatabaseService,public toastController: ToastController,public alertController: AlertController) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.drivers = this.router.getCurrentNavigation().extras.state.driver;     
      }
    });
   }

  ngOnInit() {
  }
  
  save(){
    this.database.updateDriver(this.drivers['name'],this.drivers['surname'],this.drivers['cf_driver'],this.drivers['phone'],this.drivers['email']);
    this.database.getDriverLogin();
    this.showToast();
    this.hideToast();
    this.router.navigateByUrl('/settings/drivers');

    }

    showToast() {
      this.toast = this.toastController.create({
        message: 'Aggiornato dati conducente!',
        duration: 4000
      }).then((toastData) => {
        toastData.present();
      });
    }
  
    hideToast(){
      this.toast = this.toastController.dismiss();
    }
  }

