import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DatabaseService, Driver} from '../../database.service'
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  options = {day: 'numeric', month: 'long', year:'numeric'};
  subscribe:any;
  driver = {}
  drivers: Driver[] = [];
  driverLogin: string;


  public currentDate : string = new Date().toLocaleDateString("it-IT",this.options);

  constructor(private router : Router, private database : DatabaseService,public platform:Platform) {
    this.database.getDatabaseState().subscribe(async ready => {
      if(ready){
        this.database.getDrivers().subscribe(driver => {
          this.drivers = driver;
        });
        await this.getDriverLogin().then(res =>{
          this.driverLogin = res;
        })
      }

      }); 
  }

  pageSettings(){
    this.router.navigate(['/settings/agency']);
  }
  dayDates(){
    this.router.navigate(['/datadays'])

  }
  //return email of driver login
  async getDriverLogin(){
    let res = await this.database.getDriverLogin();
    console.log("resemail"+res.email);
    return res.email;

  }

}
