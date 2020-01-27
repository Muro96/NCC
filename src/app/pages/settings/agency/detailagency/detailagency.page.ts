import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency, DatabaseService } from 'src/app/database.service';
import { ToastController, AlertController } from '@ionic/angular';
import { AgencyPage } from '../agency.page';

@Component({
  selector: 'app-detailagency',
  templateUrl: './detailagency.page.html',
  styleUrls: ['./detailagency.page.scss'],
})
export class DetailagencyPage implements OnInit {
  toast: any;
  agencies: Agency[] = [];
  agency = {};
  

  constructor(private route: ActivatedRoute,private router: Router, public database : DatabaseService,public toastController: ToastController,public alertController: AlertController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.agencies = this.router.getCurrentNavigation().extras.state.agency;     
      }
    });
   
   }

  ngOnInit() {}

  showToast() {
    this.toast = this.toastController.create({
      message: 'Modificata azienda!',
      duration: 4000
    }).then((toastData) => {
      toastData.present();
    });
  }

  hideToast(){
    this.toast = this.toastController.dismiss();
  }



  removeAgency(agency: Agency) {
    this.database.deleteAgency(agency.agency_id);
    this.router.navigateByUrl('/settings/agency');

  }
  updateAgency(agency: Agency){
    this.database.updateAgency(agency);
    this.showToast();
    this.hideToast();
    this.router.navigateByUrl('/settings/agency');
  }

  async presentAlert(agency: Agency) {
    const alert = await this.alertController.create({
      header: 'Sei sicuro di voler eliminare l\'azienda?',
      buttons: [
        {
        text: 'OK',
        cssClass: 'secondary',
        handler: () => {
          this.removeAgency(agency);  
          
        }
      },
      {
        text: 'ANNULLA',
      }
      ]
    });

  await alert.present();
  }


}
