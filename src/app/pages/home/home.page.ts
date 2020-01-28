import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DatabaseService} from '../../database.service'
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  options = {day: 'numeric', month: 'long', year:'numeric'};
  subscribe:any;

  public currentDate : string = new Date().toLocaleDateString("it-IT",this.options);

  constructor(private router : Router, private database : DatabaseService,public platform:Platform) {
    this.database.getDatabaseState().subscribe(ready => {
      if(ready){
        console.log("database pronto");
      }
    })
    this.platform.backButton.subscribe(() => {
      console.log("noooo");

    });
  }

  pageSettings(){
    this.router.navigate(['/settings/agency']);
  }
  dayDates(){
    this.router.navigate(['/datadays'])

  }

}
