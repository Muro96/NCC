import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService, Driver } from 'src/app/database.service';
import { delay } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  drivers: Driver[] = [];
  driver = {};
  isActiveToggleTextPassword: Boolean = true;

  constructor(private router: Router, private database: DatabaseService,private alertController: AlertController) { }

  ngOnInit() {
    this.database.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.database.getDrivers().subscribe(driver => {
          this.drivers = driver;
        });    
      }
    });

  }

  async check(driver: Driver){
    let res = await this.database.checkEmail(this.driver['email']);
    return res;
  }

  async addDriver(driver: Driver){
    let res = await this.check(driver);
    if(res==0){
      this.database.addDriver(this.driver['name'],this.driver['surname'],this.driver['cf_driver'],this.driver['phone'],this.driver['email'],this.driver['password'],this.driver['is_login']);
      this.router.navigateByUrl('/login');
    }
    else{
      this.userAlreadyRegister();
      
    } 
  }

  async userAlreadyRegister() {
    const alert = await this.alertController.create({
      header: 'ATTENZIONE!',
      
      message: 'Sei già registrato con questo indirizzo email! ',
      buttons: [{
          text: 'OK',
          cssClass: 'secondary'}]
    });

  await alert.present();
  }

  showHide(){
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)? false:true;
  }

  getType(){
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }
}
