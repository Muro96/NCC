import { Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {DatabaseService} from '../../../database.service'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.page.html',
  styleUrls: ['./agency.page.scss'],
})


export class AgencyPage implements OnInit {
  agency = {};

  //variabili che prendo dal form per l'inserimento delle agenzie 
  name: string= "";
  vat: string= "";
  cf: string= "";
  address: string= "";
  city: string= "";
  cap: string= "";
  province: string= "";
  phone: string= "";

  constructor(public navCtrl: NavController, public database: DatabaseService){}

  ngOnInit() {}

  addAgency(){
    this.database.addAgency(this.agency['name'], this.agency['vat'],this.agency['cf'],this.agency['address'],this.agency['city'],this.agency['cap'],this.agency['province'],this.agency['phone']);
    

  }

  
  }
  
