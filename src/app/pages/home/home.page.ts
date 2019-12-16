import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  options = {day: 'numeric', month: 'long', year:'numeric'};

  public currentDate : string = new Date().toLocaleDateString("it-IT",this.options);

  constructor() {}

}
