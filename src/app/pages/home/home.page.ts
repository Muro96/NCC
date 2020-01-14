import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DatabaseService} from '../../database.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  options = {day: 'numeric', month: 'long', year:'numeric'};

  public currentDate : string = new Date().toLocaleDateString("it-IT",this.options);

  constructor(private router : Router, private database : DatabaseService) {
    this.database.getDatabaseState().subscribe(ready => {
      if(ready){
        console.log("database pronto");
      }
    })
  }

  pageSettings(){
    this.router.navigate(['/settings/agency']);
  }
  dayDates(){
    this.router.navigate(['/datadays'])

  }

}
