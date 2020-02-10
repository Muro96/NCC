import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DatabaseService, Driver } from 'src/app/database.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss'],
})
export class DriversPage implements OnInit {


  driver = {};
  driv: Driver[] = [];
  drivers: Driver[] = [];
 

   constructor(private database : DatabaseService,private router:Router){}

  ngOnInit() {
    this.database.getDatabaseState().subscribe(ready => {
      if (ready) {
        this.database.getDriverLogin().then(driver => {
          this.drivers['driver_id'] = driver.driver_id;
          this.drivers['name'] = driver.name;
          this.drivers['surname'] = driver.surname;
          this.drivers['cf_driver'] = driver.cf_driver;
          this.drivers['phone'] = driver.phone;
          this.drivers['email'] = driver.email;
          this.drivers['password'] = driver.password;
          this.drivers['is_login'] = driver.is_login;
          
        });    
      }
    });
  }

  async getInfoDriverLog(){
    let res = await this.database.getDriverLogin();
    return this.driv.push({
      driver_id: res.driver_id,
      name: res.name,
      surname: res.surname,
      cf_driver: res.cf_driver,
      phone: res.phone,
      email: res.email,
      password: res.password,
      is_login: res.is_login
    })
  }

  updateDriver(driver:Driver){
    let navigationExtras : NavigationExtras = {
      state: {
        driver: driver
      }
    };
    this.router.navigate(['settings/drivers/updatedriver'],navigationExtras);
    
  }


 
  }
